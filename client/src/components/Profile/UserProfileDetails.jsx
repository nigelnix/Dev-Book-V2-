import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import './Profile.scss'
import banerImgLight from '../../assets/img/banerLight.jpg'
import banerImgDark from '../../assets/img/darkBanner.jpg'
import defaultUserPic from '../../assets/img/pepeUserPic.jpg'
import { useNavigate } from 'react-router-dom'

function UserProfileDetails({ theme, setTheme }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/profile/${user._id}`)
  }

  const { user } = useContext(AuthContext)

  return (
    <>
      <div className='banner-container'>
        <img
          className='banner-img'
          src={
            user.userBanner
              ? user.userBanner
              : theme === 'dark'
              ? banerImgDark
              : banerImgLight
          }
          alt=''
        />

        <img
          onClick={handleClick}
          className='profile-img borderImg box-shadow'
          src={user.userPic ? user.userPic : defaultUserPic}
          alt=''
        />
      </div>
      <div className='user-details-container'>
        <div className='user-name-conatiner'>
          <h3 className='user-name text'>{user.username}</h3>
        </div>
        <div className='user-nickname-conatiner text'>
          <h3 className='user-nickname textPostNickname'>
            {user.nickname ? (
              `${'@'}${user.nickname}`
            ) : (
              <span style={{ display: 'block' }}>Edit your Nickname</span>
            )}
          </h3>
        </div>
        <div className='user-quote-conatiner'>
          <h3 className='user-quote text '>
            {user.quote ? (
              user.quote
            ) : (
              <span style={{ display: 'block' }}>Edit your Quote</span>
            )}
          </h3>
        </div>
      </div>
    </>
  )
}

export default UserProfileDetails
