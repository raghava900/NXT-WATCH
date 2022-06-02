import './index.css'

const GamingProps = props => {
  const {games} = props
  const {title, thumbnailUrl, viewCount} = games

  return (
    <div>
      <img src={thumbnailUrl} alt="video thumbnail" className="image" />
      <p className="title">{title}</p>
      <div>
        <div className="details">
          <p className="text">{viewCount}</p>
        </div>
      </div>
    </div>
  )
}

export default GamingProps
