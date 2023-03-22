import joi from "joi";
import questionModel from "../Models/questionModel";


// validate product fields

const questionSchema = joi.object({
    questionID: joi.string().min(3).max(255).required(),
    title: joi.string().min(3).max(255).required(),
    tagName: joi.string().min(3).max(255).required(),
    userID: joi.string().min(3).max(255).required(),
    is_deleted: joi.string().required(),
    created_at: joi.string().required(),
    updated_at: joi.string().required(),

});

export const validateQuestion = (question: questionModel) => {
    return questionSchema.validate(question);
}
