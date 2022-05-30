import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const Logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container-1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="website logo"
        className="icon-1"
      />
      <ul className="list">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/trending">
          <li className="text">Trending</li>
        </Link>
        <Link to="/gaming">
          <li>Gaming</li>
        </Link>
      </ul>{' '}
      <button type="button" className="btn" onClick={Logout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
