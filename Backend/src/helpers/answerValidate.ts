import joi from "joi"
import answerModel from "../Models/answerModel";

const answerSchema = joi.object({
    answerID: joi.string().required(),
    answerDescription: joi.string().required(),
    questionID: joi.string().required(),
    userID: joi.string().required(),
    created_at: joi.string().required(),
})

export const validateAnswer = (answer: answerModel) => {
    return answerSchema.validate(answer)
}