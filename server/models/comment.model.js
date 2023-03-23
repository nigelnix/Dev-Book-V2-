import { Schema, model } from "mongoose";
const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "username userPic" });
  next();
});

const Comment = model("Comment", commentSchema);
export { Comment as default };
