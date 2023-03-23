import { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Modal.scss'
import logoBlack from '../../../assets/img/logosmall.png'
import closeImg from '../../../assets/img/close.png'
import { AuthContext } from '../../../context/authContext'

function Modal({ setOpen }) {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const closeModal = () => {
    setOpen(false)
  }

  const [value, setValue] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [userPic, setUserPic] = useState()

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }
  const fileChange = (e) => {
    setUserPic(e.target.files[0])
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', value.username)
    formData.append('email', value.email)
    formData.append('password', value.password)
    formData.append('confirm', value.confirm)
    formData.append('userPic', userPic)
    try {
      const { data } = await axios('/api/register', {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })

      setUser(data.data)
      navigate('/')
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <img
          className='close-icon'
          src={closeImg}
          onClick={closeModal}
          alt=''
        />
        <img className='logo-img-modal' src={logoBlack} alt='' />
        <div className='modal-form-container'>
          <h1 className='register-text'>Welcome to DevBook</h1>
          <form action='' method='post' onSubmit={handleSubmit}>
            {/* <label htmlFor="name"><b>Name</b> */}
            <input
              type='text'
              placeholder='Enter username'
              name='username'
              id='username'
              onChange={handleChange}
            />
            {/* <label htmlFor="email"><b>Email</b> */}
            <input
              type='text'
              placeholder='Enter Email'
              name='email'
              id='email'
              onChange={handleChange}
            />
            {/* <label htmlFor="psw"><b>Password</b> */}
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              id='password'
              onChange={handleChange}
            />
            {/* <label htmlFor="psw-repeat"><b>Repeat Password</b> */}
            <input
              type='password'
              placeholder='confirm Password'
              name='confirm'
              id='confirm'
              onChange={handleChange}
            />
            <input type='file' name='userPic' onChange={fileChange} />
            <p className='policy-text'>
              By creating an account you agree to our{' '}
              <a href='#'>Terms & Privacy</a>.
            </p>
            <button type='submit' className='register-button buuton-TextInput'>
              Register
            </button>
          </form>

          <div className='container-signin'>
            <p onClick={closeModal} className='sign-in-text'>
              Already have an account? <a href='#'>Sign in</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
