import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ProfileLargeComponent.scss'
import Post from '../Posts/Post/Post'
import banerImgLight from '../../assets/img/banerLight.jpg'
import banerImgDark from '../../assets/img/darkBanner.jpg'

const fetchData = async (profileID, setProfile, navigate, setPosts) => {
  try {
    const { data } = await axios(`/api/users/${profileID}?posts=true`, {
      method: 'GET',
      withCredentials: true,
    })
    setProfile(data.data)
    setPosts(data.data.posts)
  } catch (err) {
    console.error(err)
    setProfile({})
    navigate('/')
  }
}

function ProfileLargeComponent({ theme, setPosts }) {
  const navigate = useNavigate()
  const { profileID } = useParams()
  const [profile, setProfile] = useState({})
  const { userBanner, userPic, quote, nickname, username } = profile

  useEffect(() => {
    fetchData(profileID, setProfile, navigate, setPosts)
  }, [profileID])

  return profile ? (
    <div className='ProfileLargeComponent-container backgroundInner box-shadow'>
      <div className='banner-container'>
        
          <img
            className='banner-img '
            src={ userBanner
              ? `${__URL_BASE__}${userBanner}`
              : theme === 'dark'
              ? banerImgDark
              : banerImgLight}
            alt=''
          />
        

        {userPic && (
          <img
            className='profile-img borderImg'
            src={`${__URL_BASE__}${userPic}`}
            alt=''
          />
        )}
      </div>
      <div className='user-details-container'>
        <div className='user-name-conatiner'>
          <h3 className='user-name text'>{username}</h3>
        </div>
        <div className='user-nickname-conatiner text'>
          <h3 className='user-nickname text'>{nickname}</h3>
        </div>
        <div className='user-quote-conatiner'>
          <h3 className='user-quote text'>{quote}</h3>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  )
}

export default ProfileLargeComponent
