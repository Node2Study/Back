const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('../models/Team');

const projectSchema = new Schema({
  // 프로젝트 진행 팀
  team: {
    type: mongoose.ObjectId,
    ref: Team,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  techStack: {
    type: Array,
    required: true,
  },
  githubURL: {
    type: String,
    required: true,
  },
  deployURL: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  duration: {
    type: Date,
    required: true,
  },
  // 좋아요, 추천
  like: {
    type: Number,
  },
}, {timestamps: true});

projectSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updatedAt;
  delete obj.createdAt;
  return obj;
};

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;