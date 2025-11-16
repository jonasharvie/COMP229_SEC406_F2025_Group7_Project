import mongoose from "mongoose";

const SurveyQuestionSchema = new mongoose.Schema({
    surveynumber: {
        type: Number,
        required: "Survey number is required",
    },
    question: {
        type: String,
        trim: true,
        required: "Question is required",
    },
    yes: {
        type: Number,
        default: 0,
    },
    no: {
        type: Number,
        default: 0,
    },
});


export default mongoose.model("SurveyQuestion", SurveyQuestionSchema);