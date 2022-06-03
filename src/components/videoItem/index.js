import {useState} from 'react'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'

import './index.css'

const VideoItem = props => {
  const {isActive, isButtonColor} = useState(false)

  const onToggle = () => {
    isButtonColor(current => !current)
  }

  const {video} = props
  const {
    title,
    video_url: videoUrl,
    channel,
    view_count: viewCount,
    published_at: publishedAt,
    description,
  } = video.video_details

  // const likeText = isLiked ? 'btn' : ''

  const {
    name,
    profile_image_url: profileImageUrl,
    subscriber_count: subscriberCount,
  } = channel

  return (
    <div>
      <div className="responsive-container">
        <ReactPlayer url={videoUrl} />
      </div>
      <p>{title}</p>
      <div className="video-arrange">
        <div className="video-arrange-1">
          <p>{viewCount}</p>
          <p>{publishedAt}</p>
        </div>

        <div
          style={{
            color: isActive ? 'red' : '',
          }}
        >
          <button type="button" onClick={onToggle}>
            <BiLike />
            Like
          </button>
          <button type="button" className="like-btn">
            <BiDislike />
            Dislike
          </button>
          <button type="button" className="like-btn">
            <CgPlayListAdd /> Save
          </button>
        </div>
      </div>

      <p>{description}</p>
      <p>{name}</p>
      <img src={profileImageUrl} alt={name} />
      <p>{subscriberCount}</p>
    </div>
  )
}

export default VideoItem
