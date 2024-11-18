const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

const authController = {};

authController.emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      const isPassword = await bcrypt.compare(password, findUser.password);
      if (!isPassword) throw new Error("아이디 또는 비밀번호가 틀렸습니다.");

      const { accessToken, refreshToken } = await findUser.generateToken();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // 클라이언트 자바스크립트에서 접근 불가
        secure: false, // 배포시 true로 변경
        sameSite: "strict", // 동일 출처에서만 사용 가능
      });

      return res.status(200).json({ status: "success", findUser, accessToken });
    }
  } catch (error) {
    res.status(402).json({ status: "fail", error: error.message });
  }
};

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;

    if (tokenString) {
      const token = tokenString.replace("Bearer ", "");

      jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
        if (error) {
          return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
        }
        req.userId = payload._id;
      });
    } else {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) return;

      jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY, (error, payload) => {
        if (error) {
          return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
        }

        const accessToken = jwt.sign({ _id: payload._id }, JWT_SECRET_KEY, {
          expiresIn: "10m",
        });

        req.userId = payload._id;
        req.accessToken = accessToken;
      });
    }

    next();
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = authController;
