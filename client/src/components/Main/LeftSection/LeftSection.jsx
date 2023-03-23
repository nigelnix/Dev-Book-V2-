import React from 'react'
import './LeftSection.scss'
import Profile from '../../Profile/Profile'
import Rooms from '../../Rooms/Rooms'

function LeftSection({ theme, setTheme }) {
  return (
    <div className='left-section-container'>
      <Profile theme={theme} setTheme={setTheme} />
      <Rooms theme={theme} setTheme={setTheme} />
    </div>
  )
}

export default LeftSection
