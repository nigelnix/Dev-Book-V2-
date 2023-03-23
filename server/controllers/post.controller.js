import Post from '../models/post.model.js'
//
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/AppError.js'
import { getPagination } from './post.helper.js'

const createPost = catchAsync(async (req, res) => {
  const { desc, title } = req.body
  const { _id: user } = req.user
  const image = req.file ? req.file.path : undefined

  const document = new Post({
    user,
    desc,
    title,
    image,
  })
  const query = await document.populate({
    path: 'user',
    select: 'username userPic userBanner nickname',
  })
  const data = await query.save()

  res.status(201).json({
    status: 'success',
    data,
  })
})
const getAllPosts = catchAsync(async (req, res) => {
  const query = Post.find({})
  const { skip, limit } = getPagination(req.query)
  query.skip(skip).limit(limit)
  const data = await query.sort({
    createdAt: -1,
  })
  res.status(200).json({
    status: 'success',
    results: data.length,
    data,
  })
})
const getPost = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await Post.findById(id).orFail(
    new AppError('Post not found.', 404)
  )
  res.status(200).json({
    status: 'success',
    data,
  })
})
const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { _id: userID } = req.user
  const data = await Post.findById(id).orFail(
    new AppError('Post not found.', 404)
  )
  if (data.user._id.toString() !== userID.toString()) {
    return next(
      new AppError('Post does not belong to the logged in user.', 401)
    )
  }
  await data.delete()
  res.status(204).json({
    status: 'success',
    data: null,
  })
})

const likePost = catchAsync(async (req, res, next) => {
  const { _id: userID } = req.user
  const { id: postID } = req.params

  const foundPost = await Post.findById(postID).orFail(
    new AppError('post not found', 404)
  )
  let { likes } = foundPost

  const hasLiked = likes.find((e) => e._id.toString() === userID.toString())
  hasLiked
    ? (likes = likes.filter((e) => e._id.toString() !== userID.toString()))
    : likes.push(userID)
  const data = await Post.findByIdAndUpdate(
    foundPost._id,
    { likes },
    { new: true, runValidators: true }
  )

  const state = hasLiked ? false : true

  res.status(200).json({ status: 'success', state, data })
})

export { createPost, getAllPosts, getPost, deletePost, likePost }
