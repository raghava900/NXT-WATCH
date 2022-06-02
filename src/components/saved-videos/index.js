import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import Header from '../Header'
import './index.css'

const SavedVideos = () => (
  <div>
    <Link to="/saved-videos">
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
        </div>
      </div>
    </Link>
  </div>
)

export default SavedVideos
