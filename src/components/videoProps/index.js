import {Link} from 'react-router-dom'

import './index.css'

const VideoProps = props => {
  const {homeVideo} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = homeVideo

  return (
    <Link to={`/videos/${id}`}>
      <div className="box">
        <img src={thumbnailUrl} alt="video thumbnail" className="image" />
        <p className="title">{title}</p>
        <div className="details">
          <img
            src={channel.profile_image_url}
            alt="channel logo"
            className="image-1"
          />

          <div className="details-1">
            <p className="text">{channel.name}</p>
            <div className="details">
              <p className="text">{viewCount}</p>
              <p className="text">.{publishedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoProps
