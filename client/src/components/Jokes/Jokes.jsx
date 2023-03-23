import React, { useEffect, useState } from 'react'
import './Jokes.scss'

function Jokes() {
  const [jokes, setJokes] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const fetchJokes = async () => {
    const res = await fetch('https://api.chucknorris.io/jokes/random')
    const data = await res.json()
    setJokes(data)
  }

  useEffect(() => {
    fetchJokes()
  }, [])

  return (
    <div className='jokes-conatiner backgroundInner box-shadow text'>
      <h3 className='card-title'>Stay Happy</h3>
      <div className='border-line'></div>
      <div className='joke-wraper'>
        <div className='joke-content'>
          <p className='text'>{jokes.value}</p>
        </div>
        <div className='button-container'>
          <button
            onClick={fetchJokes}
            className='joke-btn text backgroundInner border button-TextInput'
          >
            Get Joke!
          </button>
        </div>
      </div>
    </div>
  )
}

export default Jokes
