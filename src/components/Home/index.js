import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import VideoProps from '../videoProps'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial[0],
    VideoList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getVideos()
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const homeVideosApiUrl = 'https://apis.ccbp.in/videos/all?search='
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(homeVideosApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: each.channel,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        VideoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailure = () => (
    <div className="job-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-pic"
      />
      <h1 className="job-heading-1">Oops! Something Went Wrong</h1>
      <p className="job-subheading">We are having some trouble</p>
      <button type="button" className="bon" onClick={() => this.getVideos()}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="job-container" testId="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderVideosList = () => {
    const {searchInput, VideoList} = this.state
    const searchResult = VideoList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const noJobs = searchResult.length > 0

    return noJobs ? (
      <div className="job-container">
        <ul>
          {searchResult.map(item => (
            <VideoProps key={item.id} homeVideo={item} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="job-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="failure-pic"
        />
        <h1 className="job-heading-1">No Search results found</h1>
        <p className="job-subheading">
          Try different key words or remove search filter
        </p>
        <button type="button" className="bon" onClick={() => this.getVideos()}>
          Retry
        </button>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Link to="/">
          <Header />
          <div>
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/trending">
                <li>Trending</li>
              </Link>
              <Link to="/gaming">
                <li>Gaming</li>
              </Link>
              <Link to="/saved Videos">
                <li>Saved Videos</li>
              </Link>
            </ul>
            {this.renderProductDetails()}
          </div>
        </Link>
      </div>
    )
  }
}

export default Home
