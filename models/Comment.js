const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  // 프로젝트 평가 댓글 작성자(작성자 유저 id)
  writer: {
    type: mongoose.ObjectId,
    required: true,
  },
  // 프로젝트 평가 댓글 내용
  comment: {
    type: String,
    required: true,
  }
}, {timestamps: true});

commentSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updatedAt;
  delete obj.createdAt;
  return obj;
};

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;