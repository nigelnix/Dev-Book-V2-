import React, { useEffect } from 'react'
import axios from 'axios'
import './Posts.scss'
import Post from './Post/Post'

const getPosts = async (setPosts) => {
  try {
    const { data } = await axios('/api/posts?page=1&items=50', {
      method: 'GET',
      withCredentials: true,
    })
    setPosts(data.data)
  } catch (err) {
    console.error(err)
  }
}

function Posts({ theme, posts, setPosts }) {
  useEffect(() => {
    getPosts(setPosts)
  }, [])
  return (
    <div className='post-container'>
      {posts.map((post) => (
        <Post
          theme={theme}
          {...post}
          key={`post_${post._id}`}
          setPosts={setPosts}
          posts={posts}
        />
      ))}
    </div>
  )
}

export default Posts
