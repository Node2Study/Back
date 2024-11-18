const Project = require('../models/Project');
const projectController = {};

// main-page api
projectController.getAllProjects = async (req, res) => {
  try {
    // 검색
    const {name} = req.query;
    const cond = {isDeleted: false, ...(name ? {name: {$regex: name, $options: 'i'}} : {})};
    let projectList = Project.find(cond);
    let response = {status: 'success'};
    response.data = await projectList.exec();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({status: 'fail', error: error.message});
  }
};

module.exports = projectController;