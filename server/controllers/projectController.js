const mongoose = require('mongoose');
const Project = mongoose.model('project');

exports.projects = async (req, res) => {
  try {
    let project = await Project.find().exec();
    res.status(200).json(project);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.createProject = async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    contact_detail: {
      contact_type: req.body.contact_type,
      contact_info: req.body.contact_info,
      contact_name: req.body.contact_name,
    },
    location: {
      country: req.body.country,
      city: req.body.city,
    },
    created_at: Date.now(),
    updated_at: Date.now()
  });

  try {
    let newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.readProject = async (req, res) => {
  try {
    let project = await Project.findOne({_id: req.params.id}).exec();
    res.status(200).json(project);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.updateProject = async (req, res) => {
  try {
    let project = await Project.findOneAndUpdate({_id: req.params.id},{...req.body}, {new: true}).exec();
    res.status(200).json(project);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findOneAndRemove({_id: req.params.id}).exec();
    res.status(200).send();
  } catch (err) {
    res.status(404).send(err);
  }
};