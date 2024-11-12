const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  // 팀 이름
  name: {
    type: String,
    required: true,
  },
  // 팀 리더
  leader: {
    type: mongoose.ObjectId,
    required: true,
  },
  // 팀원 -> 개인, 단체로 나눌 수 있다.
  memberList: [
    {
      userId: {
        type: mongoose.ObjectId,
        required: true,
      },
    }
  ],
}, {timestamps: true});

teamSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updatedAt;
  delete obj.createdAt;
  return obj;
};

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;