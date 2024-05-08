import React from 'react'
import PropTypes from 'prop-types'
import './Post.css'
import vinylImage from '../assets/vinyl.png'

const Post = ({ jsonData }) => {
  const date = new Date(jsonData.album_date)
  const formated = date.toISOString().slice(0, 10)
  const handleClick = () => {
    window.open((jsonData.music), '_blank')
  }

  return (
        <div className='postContainer'>
            <div className='topPost'>
                <div className='hitbox' onClick={handleClick}>
                    <img src={jsonData.cover_art} alt="" className='cover' />
                    <img src={vinylImage} alt="" className='vinyl' />
                </div>

                <div className='info'>
                    <h1>{jsonData.name}</h1>
                    <ul>
                        <li>Artist - {jsonData.artist}</li>
                        <li>Album - {jsonData.album}</li>
                        <li>Release Date - {formated}</li>
                    </ul>
                </div>
            </div>
            <div className='midPost'>
                <p>{jsonData.content}</p>
                <div className='space'></div>
                <div className="circle">
                    <h1>{jsonData.rank}</h1>
                </div>
            </div>
            <div className='bottomPost'>
                <p>Published: {jsonData.post_date}</p>
            </div>
        </div>
  )
}

Post.propTypes = {
  jsonData: PropTypes.object.isRequired
}

export default Post
