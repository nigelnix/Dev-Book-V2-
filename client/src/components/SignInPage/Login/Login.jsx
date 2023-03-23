import React, { useContext, useEffect, useState } from 'react'
import '../SignInPage.scss'
import '../Modal/Modal.scss'
import Modal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logowhite from '../../../assets/img/logowhite.png'
import { AuthContext } from '../../../context/authContext'

function Login({ open, setOpen }) {
  const { user, setUser } = useContext(AuthContext)
  const [loginStatus, setLoginStatus] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    user && navigate('/')
  })
  const openModal = () => {
    setOpen(true)
  }

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    const axiosConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data,
    }
    try {
      const { data } = await axios(
        '/api/login?friends=true&posts=true',
        axiosConfig
      )
      setUser(data.data)
      navigate('/')
    } catch (error) {
      console.log(error)
      setLoginStatus(true)
      setTimeout(() => {
        setLoginStatus(false)
      }, 2000)
    }
  }

  return (
    <div className='sign-form-box backgroundInner box-shadow'>
      <img className='logo-img-login' src={logowhite} alt='' />
      <h2 className='text'>
        Welcome <br /> Back!
      </h2>
      <p className='welcome-p'>Please sign-in to continue!</p>
      <div className='welcome-section-container'></div>
      <form className='form' action='' method='post' onSubmit={handleSubmit}>
        <input
          className='border box-shadow button-TextInput text '
          type='text'
          placeholder='Login'
          id='email'
          name='email'
          required={true}
          onChange={handleChange}
        />
        <input
          className='border box-shadow button-TextInput text '
          type='text'
          placeholder='Password'
          id='password'
          name='password'
          required={true}
          onChange={handleChange}
        />
        <button
          className='button-sign-in border text button-TextInput'
          type='submit'
          id='button'
        >
          Sign In!
        </button>
        {loginStatus ? (
          <div className='sign-in-error'>
            Username or password was incorrect
          </div>
        ) : null}
      </form>

      <a className='password-text' href='#'>
        <p className='text'>Forgot your password?</p>
      </a>

      <div className='border-white border-line'></div>

      <button
        onClick={openModal}
        className='create-acc-btn border text button-TextInput'
      >
        Create Account
      </button>
    </div>
  )
}

export default Login
