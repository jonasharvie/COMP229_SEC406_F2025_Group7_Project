import Project from "../models/projects.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    return res.status(200).json({
      message: "Successfully created project!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let projects = await Project.find().select("title firstname lastname email completion description");
    res.json(projects);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const projectByID = async (req, res, next, id) => {
  try {
    let project = await Project.findById(id);
    if (!project)
      return res.status("400").json({
        error: "Project not found",
      });
    req.project = project;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve project",
    });
  }
};

const read = (req, res) => {
  return res.json(req.project);
};

const update = async (req, res) => {
  try {
    let project = req.project;
    project = extend(project, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let project = req.project;
    let deletedProject = await project.deleteOne();
    res.json(deletedProject);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    let projectsDeleted = await Project.deleteMany({});
    res.json({
      message: `Successfully deleted ${projectsDeleted.deletedCount} project(s)`,
      deletedCount: projectsDeleted.deletedCount
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, projectByID, read, list, remove, update, removeAll };