import React, { useState } from 'react'
import './Layout.scss'
import Navbar from '../Navbar/Navbar'
import LeftSection from '../Main/LeftSection/LeftSection'
import RightSection from '../Main/RightSection/RightSection'
import { Outlet } from 'react-router-dom'
import '../../_reset.scss'
import '../../variables/variables.scss'

import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

function Layout() {
  const [theme, setTheme] = useState('dark')
  const { user } = useContext(AuthContext)
  return (
    <div className={theme}>
      {user && (
        <div className='main background box-shadow'>
          <Navbar theme={theme} setTheme={setTheme} />
          <div className='main-layout-container'>
            <LeftSection theme={theme} setTheme={setTheme} />
            <Outlet context={[theme]} />
            <RightSection theme={theme} setTheme={setTheme} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout
