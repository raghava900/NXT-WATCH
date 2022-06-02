import './index.css'
import Header from '../Header'

const notFound = () => (
  <div className="job-container">
    <Header />
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
      alt="not found"
      className="pic12"
    />
    <h1 className="not-heading">Page Not Found</h1>
    <p className="not-heading">
      we are sorry, the page you requested could not be found
    </p>
  </div>
)

export default notFound
