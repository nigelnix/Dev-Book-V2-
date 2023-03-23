import './Post.scss'
import likeImg from '../../../assets/img/like.png'
import likeImgLight from '../../../assets/img/likeLight.png'
import redHeartImg from '../../../assets/img/heart(1).png'
// import
function LikeButton({ hasLiked, handleLikeUnlike, theme }) {
  return (
    <div className='item' onClick={handleLikeUnlike}>
      {hasLiked ? (
        <img src={redHeartImg} alt='liked image button' />
      ) : (
        <img
          src={theme === 'dark' ? likeImgLight : likeImg}
          alt='like button'
        />
      )}
      <p className='text'>{hasLiked ? 'Unlike' : 'Like'}</p>
    </div>
  )
}
export default LikeButton
