import joi from "joi"
import commentModel from "../Models/commentModel"


const commentSchema = joi.object({
    commentID: joi.string().required(),
    commentDescription: joi.string().required(),
    userID: joi.string().required(),
    answerID: joi.string().required(),
    created_at: joi.string().required(),
})

export const validateComment = (comment: commentModel) => {
    return commentSchema.validate(comment)
}