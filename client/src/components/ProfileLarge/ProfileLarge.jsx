import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import './ProfileLarge.scss'
import ProfileLargeComponent from './ProfileLargeComponent'
import Post from '../Posts/Post/Post'

function ProfileLarge() {
  const [theme] = useOutletContext()
  const [posts, setPosts] = useState([])
  return (
    <div className='profile-section-container'>
      <ProfileLargeComponent theme={theme} setPosts={setPosts} />
      {posts.map((post) => (
        <Post
          theme={theme}
          {...post}
          key={`large_post_${post._id}`}
          posts={posts}
          setPosts={setPosts}
        />
      ))}
    </div>
  )
}

export default ProfileLarge
