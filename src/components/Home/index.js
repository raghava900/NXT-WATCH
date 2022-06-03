import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {FiSearch} from 'react-icons/fi'
import {CgPlayListAdd} from 'react-icons/cg'
import Header from '../Header'
import VideoProps from '../videoProps'
import './index.css'
// import ThemeContext from '../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  //   static contextType = ThemeContext

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
    <div className="container" testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderVideosList = () => {
    const {searchInput, VideoList} = this.state
    const searchResult = VideoList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const noJobs = searchResult.length > 0

    return noJobs ? (
      <ul>
        <ul className="content">
          {searchResult.map(item => (
            <VideoProps key={item.id} homeVideo={item} />
          ))}
        </ul>
      </ul>
    ) : (
      <div className="job-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="failure-pic"
        />
        <h1>No Search results found</h1>
        <p>Try different key words or remove search filter</p>
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
      <Link to="/" className="link">
        <div className="container">
          {/* style={{
            backgroundColor: true ? 'salmon' : 'black',
            color: true ? 'white' : '',
          }} */}
          {/* <ThemeContext.Consumer>
            {theme => (
              <div>Selected theme is {theme.isDarkTheme ? 'hi' : 'hello'}</div>
            )}
          </ThemeContext.Consumer> */}
          <Header />
          <div className="jobs-main">
            <div className="employment">
              <ul className="list">
                <li>
                  <Link to="/">
                    <AiFillHome />
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/trending">
                    <AiFillFire /> Trending
                  </Link>
                </li>
                <li>
                  <Link to="/gaming">
                    <SiYoutubegaming /> Gaming
                  </Link>
                </li>
                <li>
                  <Link to="/saved-videos">
                    <CgPlayListAdd /> Saved videos
                  </Link>
                </li>
              </ul>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="home-icon"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="home-icon"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="home-icon"
                />
                <p className="home-subheading">CONTACT US</p>
                <p className="home-heading">
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
            <div className="banner-1">
              <div className="banner">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="nxt watch logo"
                  className="icon-1"
                />
                <p>Buy Nxt Watch Premium</p>
                <button type="button">GET IT NOW</button>
              </div>
              <div>
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  onClick={() => this.getVideos()}
                >
                  <FiSearch />
                </button>
              </div>

              <ul>
                <ul>{this.renderProductDetails()}</ul>
              </ul>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default Home
