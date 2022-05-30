import './index.css'

const VideoProps = props => {
  const {homeVideo} = props
  const {title, thumbnailUrl, channel, viewCount, publishedAt} = homeVideo

  return (
    <div>
      <img src={thumbnailUrl} alt="video thumbnail" />
      <p>{title}</p>
      <p>{channel.name}</p>
      <img src={channel.profile_image_url} alt="channel logo" />
      <p>{viewCount}</p>
      <p>{publishedAt}</p>
    </div>
  )
}

export default VideoProps
