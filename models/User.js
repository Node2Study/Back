const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

const userSchema = new Schema(
  {
    nickName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    // 프로필 이미지
    profileImg: {
      type: String,
    },
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
        },
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updatedAt;
  delete obj.createdAt;
  return obj;
};

userSchema.methods.generateToken = async function () {
  // 액세스 토큰 생성
  const accessToken = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "10m",
  });

  // 리프레시 토큰 생성
  const refreshToken = jwt.sign({ _id: this._id }, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  this.refreshToken = refreshToken;
  await this.save();

  return { accessToken, refreshToken };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
