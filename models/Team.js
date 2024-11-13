const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  // 팀 이름
  name: {
    type: String,
    required: true,
  },
  // 팀원(유저 id)
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