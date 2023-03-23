import { useEffect, useState } from 'react'

function LikedBy({ likes, likesCount }) {
  const [text, setText] = useState('')
  useEffect(() => {
    console.log(likes)
    let t = likes
      .map((like) => like.username)
      .slice(0, 3)
      .join(', ')
    if (likesCount > 3) {
      t = t.concat(` ... and ${likesCount - 3} others.`)
    }
    setText(t)
  }, [likesCount])

  return (
    <div className='text' style={{ width: '40rem' }}>
      <p>{text}</p>
    </div>
  )
}
export default LikedBy
