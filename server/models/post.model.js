import { Schema, model } from 'mongoose'
const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    desc: {
      type: String,
      maxlength: [
        100,
        '{PATH} name must be between 100 or less characters long.',
      ],
      required: true,
    },
    title: {
      type: String,
      maxlength: [
        50,
        '{PATH} name must be between 50 or less characters long.',
      ],
    },
    image: {
      type: String,
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
  },
  { timestamps: true, toObject: {virtuals : true}, toJSON: {virtuals : true}}
)

postSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'username userPic nickname' })
  next()
})

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id'
})

postSchema.pre(/^find/, function (next) {
  this.populate({ path: 'comments' })
  next()
})
postSchema.pre(/^find/, function (next) {
  this.populate({ path: 'likes' })
  next()
})
postSchema.virtual('numberOfLikes').get(function(){
  return this.likes.length
})


const Post = model('Post', postSchema)
export { Post as default }
