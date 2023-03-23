import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/AppError.js'
import { verifyFileUpload } from './authN.helpers.js'
import User from '../models/user.model.js'
import { deleteReplacedPicture, attachQueries } from './user.helpers.js'
const getAllUsers = catchAsync(async (req, res) => {
  const data = await attachQueries(User.find({}), req.query)
  res.status(200).json({
    status: 'success',
    results: data.length,
    data,
  })
})
const getUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await attachQueries(User.findById(id), req.query).orFail(
    new AppError('User not found.', 404)
  )
  res.status(200).json({
    status: 'success',
    data,
  })
})
const updateSelf = catchAsync(async (req, res, next) => {
  const { _id: id } = req.user
  const { username, nickname, quote, email } = req.body
  const { userBanner, userPic } = verifyFileUpload(req.files)
  const data = await User.findByIdAndUpdate(
    id,
    {
      username,
      nickname,
      quote,
      email,
      userBanner,
      userPic,
    },
    { new: true, runValidators: true }
  )
    .populate({ path: 'friends', select: 'username userPic nickname' })
    .populate({ path: 'posts' })
    .orFail(new AppError('User profile deleted.', 404))
  if (userBanner) {
    await deleteReplacedPicture(req.user, 'userBanner')
  }
  if (userPic) {
    await deleteReplacedPicture(req.user, 'userPic')
  }
  res.status(200).json({
    status: 'success',
    data,
  })
})
const addRemoveFriend = catchAsync(async (req, res, next) => {
  const { id: friendID } = req.params
  const { _id: userID } = req.user
  let { friends } = req.user
  const foundFriend = await User.findById(friendID).orFail(
    new AppError('Friend not found.', 404)
  )
  const isFriend = friends.find((e) => e._id.toString() === friendID)
  isFriend
    ? (friends = friends.filter((e) => e._id.toString() !== friendID))
    : friends.push(foundFriend._id)
  const data = await User.findByIdAndUpdate(
    userID,
    { friends },
    { new: true, runValidators: true }
  )
    .populate({ path: 'friends', select: 'username userPic nickname' })
    .orFail(new AppError('User was deleted', 404))
  res.status(200).json({
    status: 'success',
    data,
  })
})
export { getAllUsers, getUser, updateSelf, addRemoveFriend }
