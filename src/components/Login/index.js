import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFrom = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      this.onSuccess(fetchedData.jwt_token)
    } else {
      this.onFailure(fetchedData.error_msg)
    }
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div>
          <form onSubmit={this.onSubmitFrom} className="login-container">
            <div className="logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="website logo"
                className="icon-1"
              />
            </div>
            <label htmlFor="username" className="text">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              className="input"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="text">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              className="input"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="btn">
              Login
            </button>
            {showErrorMsg && <p className="error">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
