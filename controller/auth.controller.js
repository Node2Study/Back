const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("../models/User");

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

module.exports = authController;
