import './Comments.scss'
import moment from 'moment'

function Comment({ text, user, createdAt }) {
  return (
    <div className='comment'>
      <img className='borderImg' src={user.userPic} alt='' />
      <div className='user-info-comment'>
        <span className='text'>{text}</span>
        <p className='text'>{user.username}</p>
      </div>
      <span className='date text'>{moment(createdAt).fromNow()}</span>
    </div>
  )
}
export default Comment
