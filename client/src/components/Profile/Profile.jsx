import React, { useState } from 'react'
import './Profile.scss'
import UserProfileDetails from './UserProfileDetails'
import EditProfile from './EditProfile/EditProfile'

function Profile({ theme, setTheme }) {
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <div className='profile-container backgroundInner box-shadow'>
      <UserProfileDetails theme={theme} setTheme={setTheme} />
      {open && (
        <EditProfile open={open} setOpen={setOpen} closeModal={closeModal} />
      )}
      <div className='border-line border'></div>
      <div className='button-profile-conatiner '>
        <button onClick={openModal} className='text button-TextInput'>
          Edit profile
        </button>
      </div>
    </div>
  )
}

export default Profile
