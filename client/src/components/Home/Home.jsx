import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import axios from 'axios'
import './Home.scss'

import Posts from '../Posts/Posts'
import SendPost from '../SendPost/SendPost'
import Swiper from '../Swiper/Swiper'

const fetchAllUsers = async (setUsers) => {
  try {
    const { data } = await axios('/api/users', {
      method: 'GET',
      withCredentials: true,
    })
    setUsers(data.data)
  } catch (err) {
    console.log(err)
  }
}

function Home() {
  const [theme] = useOutletContext()
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchAllUsers(setUsers)
  }, [])

  return (
    <div className='home-section-container'>
      <Swiper theme={theme} users={users} />
      <SendPost theme={theme} setPosts={setPosts} />
      <Posts theme={theme} posts={posts} setPosts={setPosts} />
    </div>
  )
}

export default Home
