import ReactPlayer from 'react-player'

import './index.css'

const VideoItem = props => {
  const {video} = props
  const {
    title,
    video_url: videoUrl,
    channel,
    view_count: viewCount,
    published_at: publishedAt,
    description,
  } = video.video_details

  const {
    name,
    profile_image_url: profileImageUrl,
    subscriber_count: subscriberCount,
  } = channel

  return (
    <div>
      <p>{title}</p>
      <div className="responsive-container">
        <ReactPlayer url={videoUrl} />
      </div>
      <p>{viewCount}</p>
      <p>{publishedAt}</p>
      <p>{description}</p>
      <p>{name}</p>
      <img src={profileImageUrl} alt={name} />
      <p>{subscriberCount}</p>
    </div>
  )
}

export default VideoItem
