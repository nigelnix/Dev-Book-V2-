import React, { useContext, useState } from 'react'
import './SendPost.scss'
import userImg from '../../assets/img/userImg.jpg'
import SendBtn from '../Buttons/SendBtn'
import AddPhotoBtn from '../Buttons/AddPhotoBtn'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Picker from 'emoji-picker-react'
import emojiIcon from '../../assets/img/emoji.png'
import { Theme } from 'emoji-picker-react'
import { SuggestionMode } from 'emoji-picker-react'

function SendPost({ theme, setTheme, setPosts }) {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const handleClick = () => {
    navigate(`/profile/${user._id}`)
  }


  const [showPicker, setShowPicker] = useState(false)

  const [image, setImage] = useState(undefined)
  const [value, setValue] = useState({
    desc: '',
    title: '',
  })

  const onEmojiClick = (event, emojiObject) => {
 setValue((prev) => ({...prev,desc: prev.desc.concat(emojiObject.emoji)}) )
    setShowPicker(false)
  }

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleEmoji = (e) => {
    setInputStr(e.target.value)
  }

  const doubleFunction = () => {
    handleEmoji()
  }

  const fileChange = (e) => {
    setImage(e.target.files[0])
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    // formData.append("title", post.title);
    formData.append('desc', value.desc)
    formData.append('title', value.title)
    formData.append('user', user._id)
    formData.append('image', image)
    try {
      const axiosConfig = {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }
      const { data } = await axios('api/posts', axiosConfig)
      setPosts((prev) => [data.data, ...prev])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='sendPost-container backgroundInner box-shadow'>
      <div className='user-img-container'>
        <img
          className='borderImg box-shadow'
          src={user.userPic}
          onClick={handleClick}
          alt=''
        />
      </div>

      <div className='type-post-wraper'>
        <div>
          {/* <input
            className='searchbar box-shadow button-TextInput text'
            name='title'
            type='text'
            placeholder='Add post title'
            value={value.title}
            onChange={handleChange}
          /> */}
        </div>
        <div className='input-box'>
          <input
            className='searchbar box-shadow button-TextInput text'
            name='desc'
            type='text'
            placeholder='Send your post...'
            value={value.desc}
            onChange={handleChange}
          />

          <img
            className='emoji-icon-btn'
            src={emojiIcon}
            onClick={() => setShowPicker((val) => !val)}
            alt=''
          />

          {showPicker && (
            <Picker
              Theme='auto'
              pickerStyle={{
                width: '40%',
                position: 'absolute',
                right: '0',
                bottom: '-643%',
                background: '#f4f4f4',
              }}
              groupVisibility={{
                recently_used: false,
              }}
              disableSearchBar={true}
              disableSkinTonePicker={true}
              onEmojiClick={onEmojiClick}
            />
          )}
        </div>

        <div className='button-box'>
          <AddPhotoBtn
            fileChange={fileChange}
            theme={theme}
            setTheme={setTheme}
          />
          <SendBtn
            handlerSubmit={handlerSubmit}
            theme={theme}
            setTheme={setTheme}
          />
        </div>
      </div>
    </div>
  )
}

export default SendPost
