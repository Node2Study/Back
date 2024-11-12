const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  // 리뷰 내용
  content: {
    type: String,
    required: true,
  },
  // 리뷰 대상자
  reviewTarget: {
    type: mongoose.ObjectId,
    required: true,
  }
}, {timestamps: true});

reviewSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updatedAt;
  delete obj.createdAt;
  return obj;
};

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;