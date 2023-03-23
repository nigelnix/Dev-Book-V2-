import { useContext, useState, useEffect } from 'react'
import axios from 'axios'

import './Comments.scss'

import Comment from './Comment'
import { AuthContext } from '../../context/authContext'

function Comments({ comments: initialComments, postID }) {
  const { user } = useContext(AuthContext)

  const [value, setValue] = useState('')
  const [comments, setComment] = useState([])

  useEffect(() => {
    setComment(
      initialComments.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      )
    )
  }, [])

  const handleClick = async (evt) => {
    try {
      const { data } = await axios(`/api/comments/${postID}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          text: value,
          user: user._id,
          post: postID,
        },
      })

      setComment((prev) => [data.data, ...prev])
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (evt) => {
    setValue(evt.target.value)
  }

  return (
    <div className='comments-container'>
      <div className='write-comment-container'>
        <img className='borderImg' src={user.userPic} alt='' />
        <input
          className='button-TextInput text'
          type='text'
          placeholder='Write comment'
          value={value}
          onChange={handleChange}
        />
        <button
          className='text backgroundInner button-TextInput border'
          onClick={handleClick}
        >
          Send!
        </button>
      </div>
      {comments.map((comment) => (
        <Comment key={`comment_${comment._id}`} {...comment} />
      ))}
    </div>
  )
}

export default Comments
