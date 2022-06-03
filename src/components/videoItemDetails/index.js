import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import Header from '../Header'
import VideoItem from '../videoItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial[0],
    videoItemDetails: [],
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const videoItemDetailsApiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(videoItemDetailsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data
      this.setState({
        videoItemDetails: updatedData,
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
      <p className="job-subheading">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        type="button"
        className="bon"
        onClick={() => this.getVideoDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="job-container" testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderVideosList = () => {
    const {videoItemDetails} = this.state
    return <VideoItem video={videoItemDetails} />
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
        <div className="home-container">
          <Header />
          <div className="jobs-main">
            <div className="employment">
              <Link to="/">
                <p>
                  <AiFillHome />
                  Home
                </p>
              </Link>
              <Link to="/trending">
                <p>
                  <AiFillFire /> Trending
                </p>
              </Link>
              <Link to="/gaming">
                <p>
                  <SiYoutubegaming /> Gaming
                </p>
              </Link>
              <Link to="/saved-videos">
                <p>
                  <CgPlayListAdd /> Saved videos
                </p>
              </Link>

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

            <ul>{this.renderProductDetails()}</ul>
          </div>
        </div>
      </Link>
    )
  }
}

export default VideoItemDetails
