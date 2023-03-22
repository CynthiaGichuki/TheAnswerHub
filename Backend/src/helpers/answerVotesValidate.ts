import joi from "joi"
import answerVotesModel from "../Models/answerVotesModel"


const answerVotesSchema = joi.object({
    voteID: joi.string().required(),
    userID: joi.string().required(),
    answerID: joi.string().required(),
    vote_type: joi.string().required(),
})

export const validateAnswerVotes = (answerVotes: answerVotesModel) => {
    return answerVotesSchema.validate(answerVotes)
}