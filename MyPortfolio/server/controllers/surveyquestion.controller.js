import SurveyQuestion from "../models/surveyquestions.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const surveyquestion = new SurveyQuestion(req.body);
  try {
    await surveyquestion.save();
    return res.status(200).json({
      message: "Successfully created survey question!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let surveyquestions = await SurveyQuestion.find().select("surveynumber question yes no");
    res.json(surveyquestions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const surveyquestionByID = async (req, res, next, id) => {
  try {
    let surveyquestion = await SurveyQuestion.findById(id);
    if (!surveyquestion)
      return res.status("400").json({
        error: "Survey question not found",
      });
    req.surveyquestion = surveyquestion;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve survey question",
    });
  }
};

const read = (req, res) => {
  return res.json(req.surveyquestion);
};

const update = async (req, res) => {
  try {
    let surveyquestion = req.surveyquestion;
    surveyquestion = extend(surveyquestion, req.body);
    await surveyquestion.save();
    res.json(surveyquestion);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let surveyquestion = req.surveyquestion;
    let deletedSurveyQuestion = await surveyquestion.deleteOne();
    res.json(deletedSurveyQuestion);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    let surveyquestionsDeleted = await SurveyQuestion.deleteMany({});
    res.json({
      message: `Successfully deleted ${surveyquestionsDeleted.deletedCount} survey question(s)`,
      deletedCount: surveyquestionsDeleted.deletedCount
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, surveyquestionByID, read, list, remove, update, removeAll };