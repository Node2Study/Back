const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('../models/Review');

const userSchema = new Schema({
  nickName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  // 내가 작성한 리뷰 리스트
  reviewList: [
    {
      reviewId: {
        type: mongoose.ObjectId,
        ref: Review,
        required: true
      },
    }
  ],
  // 동료평가 리스트
  peerReviewList: [
    {
      // 리뷰 점수
      score: {
        type: Number,
      },
      // 리뷰내용
      review: {
        type: String,
      }
    }
  ]
}, {timestamps: true});

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updatedAt;
  delete obj.createdAt;
  return obj;
};

const User = mongoose.model("User", userSchema);
module.exports = User;