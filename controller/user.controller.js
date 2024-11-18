const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    let user = req.body;

    const findNickName = await User.findOne({ nickName: user.nickName });
    const findEmail = await User.findOne({ email: user.email });
    if (findNickName) throw new Error("사용중인 닉네임입니다.");
    if (findEmail) throw new Error("이미 가입된 이메일입니다.");

    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = new User({ ...user });

    await newUser.save();

    return res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId, accessToken } = req;

    const findUser = await User.findById(userId);

    if (!findUser) throw new Error("Invalid token");

    res.status(200).json({ status: "success", findUser, accessToken });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = userController;
