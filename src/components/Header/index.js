import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../context/ThemeContext'

import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const onToggleTheme = () => {
        toggleTheme()
      }

      const themeImageURL = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

      const navbarBgClassName = isDarkTheme
        ? 'navbar-bg-dark'
        : 'navbar-bg-light'

      const headerImageURL = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const Logout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      return (
        <div className={`header-container-1 ${navbarBgClassName}`}>
          <img src={headerImageURL} alt="website logo" className="icon-1" />
          <div className="head">
            <div className="head">
              <button
                type="button"
                className="btn1"
                onClick={onToggleTheme}
                testId="theme"
              >
                <img className="icon" src={themeImageURL} alt="theme" />
              </button>

              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="icon"
              />

              <button type="button" className="btn" onClick={Logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
