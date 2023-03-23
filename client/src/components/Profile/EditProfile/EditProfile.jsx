import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/authContext'
import './editProfile.scss'
import axios from 'axios'
import logoBlack from '../../../assets/img/logosmall.png'
import closeIcon from '../../../assets/img/close.png'

function EditProfile({ open, setOpen }) {
  const { user, setUser } = useContext(AuthContext)

  const closeModal = () => {
    setOpen(false)
  }

  const [value, setValue] = useState({
    username: user.username,
    nickname: user.nickname,
    quote: user.quote,
  })
  const [images, setImages] = useState({
    userBanner: null,
    userPic: null,
  })

  const handleInputChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const fileChange = (e) => {
    setImages((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', value.username)
    formData.append('nickname', value.nickname)
    formData.append('quote', value.quote)
    formData.append('userPic', images.userPic)
    formData.append('userBanner', images.userBanner)
    try {
      const axiosConfig = {
        method: 'PATCH',
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }

      const { data } = await axios(`/api/users/`, axiosConfig)
      setUser(data.data)
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <img
          className='close-icon'
          src={closeIcon}
          onClick={closeModal}
          alt=''
        />
        <img className='logo-img-modal' src={logoBlack} alt='' />
        <div className='modal-form-container'>
          <h1 className='register-text'>Edit your Profile</h1>
          <form action='' method='post' onSubmit={handleSubmit}>
            {/* <label htmlFor="name"><b>Name</b> */}
            <input
              type='text'
              placeholder='Username'
              name='username'
              id='username'
              onChange={handleInputChange}
              value={value.username}
            />
            {/* <label htmlFor="email"><b>Email</b> */}
            {/* <input type="text" placeholder="Enter Email" name="email" id="email" /> */}
            <input
              type='text'
              placeholder='Nickname'
              name='nickname'
              id='nickname'
              onChange={handleInputChange}
              value={value.nickname}
            />
            {/* <label htmlFor="psw"><b>Password</b> */}
            <input
              type='text'
              placeholder='Quote/Bio'
              name='quote'
              id='quote'
              onChange={handleInputChange}
              value={value.quote}
            />
            {/* <label htmlFor="psw-repeat"><b>Repeat Password</b> */}
            {/* <input type="password" placeholder="confirm Password" name="confirm" id="confirm"  /> */}
            <label htmlFor='userPic'>
              <p>User Profile Picture</p>
            </label>
            <input
              type='file'
              placeholder='User Picture'
              name='userPic'
              id='userPic'
              onChange={fileChange}
            />

            <label htmlFor='userBanner'>
              <p>User Banner Picture</p>
            </label>
            <input
              type='file'
              placeholder='User Banner'
              name='userBanner'
              id='userBanner'
              onChange={fileChange}
            />

            <button type='submit' className='register-button backgroundInner'>
              Save Changes
            </button>
          </form>

          {/* <div className="container-signin">
<p className='sign-in-text'>Already have an account?  <a href="#">Sign in</a>.</p>
</div> */}
        </div>
      </div>
    </div>
  )
}

export default EditProfile
