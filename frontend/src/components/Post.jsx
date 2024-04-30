import React from 'react'
import PropTypes from 'prop-types'
import './Post.css'
import vinylImage from './vinyl.png';

const Post = ({ jsonData }) => {

    const handleClick = () => {
        window.open((jsonData.music), '_blank');
    };

    return (
        <div className='postContainer'>
            <div className='topPost'>
                <div className='hitbox' onClick={handleClick}>
                    <img src={jsonData.cover_art} alt="" className='cover' />
                    <img src={vinylImage} alt="" className='vinyl' />
                </div>

                <div className='info'>
                    <h2>{jsonData.name}</h2>
                    <ul>
                        <li>Artist - {jsonData.artist}</li>
                        <li>Album - {jsonData.album}</li>
                        <li>Release Date - {jsonData.album_date}</li>
                    </ul>
                </div>
            </div>
            <div className='midPost'>
                <p>{jsonData.content}</p>
                
                <div class="circle">
                    <h2>{jsonData.rank}</h2>
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