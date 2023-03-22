import joi from "joi"
import questionVotesModel from "../Models/questionVotesModel"


const questionVotesSchema = joi.object({
    voteID: joi.string().required(),
    userID: joi.string().required(),
    questionID: joi.string().required(),
    vote_type: joi.string().required(),
})

export const validateQuestionVotes = (questionVotes: questionVotesModel) => {
    return questionVotesSchema.validate(questionVotes)
}