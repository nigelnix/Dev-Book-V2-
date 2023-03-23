import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { AuthContext } from '../context/authContext'

const axiosOptions = {
  method: 'GET',
  withCredentials: true,
}

const makeRequest = async (navigate, setUser) => {
  try {
    const { data } = await axios('/api/verifyLogin', axiosOptions)
    setUser(data.data)
  } catch (err) {
    console.log(err)
    navigate('/login')
  }
}

export default () => {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  useEffect(() => {
    makeRequest(navigate, setUser)
  }, [])
}
