import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import Header from '../Header'
import GamingProps from '../gamingprops'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial[0],
    gamingVideo: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(gamingVideosApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({
        gamingVideo: updatedData,
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
      <button
        type="button"
        className="bon"
        onClick={() => this.getTrendingVideos()}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="job-container" testId="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderVideosList = () => {
    const {gamingVideo} = this.state
    return (
      <div>
        <ul>
          {gamingVideo.map(item => (
            <GamingProps key={item.id} games={item} />
          ))}
        </ul>
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
      <Link to="/trending">
        <div className="game-container">
          <Header />
          <div className="jobs-main">
            <div className="employment">
              <p>
                <AiFillHome />
                Home
              </p>
              <p>
                <AiFillFire /> Trending
              </p>
              <p>
                <SiYoutubegaming /> Gaming
              </p>
              <p>
                <CgPlayListAdd /> Saved videos
              </p>
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
            <h1>Gaming</h1>

            <ul>{this.renderProductDetails()}</ul>
          </div>
        </div>
      </Link>
    )
  }
}

export default Trending
