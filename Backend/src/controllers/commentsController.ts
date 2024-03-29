import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../databaseHelpers/dbConnection';
import { validateComment } from '../helpers/commentValidate';
import commentModel from '../Models/commentModel';


interface ExtendedRequest extends Request {
    body: {
        commentDescription: string;
        userID: string;
        answerID: string;
    },
    params: {
        commentID: string;
    }
}

// create a new comment
export const addComment = async (req: Request, res: Response) => {
    try {
        const comment = {
            commentID: uuid() as string,
            commentDescription: req.body.answerDescription as string,
            userID: req.body.userID as string,
            answerID: req.body.answerID as string,
            created_at: new Date().toISOString(),
        }

        const { error } = validateComment(comment)
        if (error) return res.status(400).send(error.details[0].message)


        if (db.checkConnection() as unknown as boolean) {
            const commentCreated = await db.exec('addComment', {
                commentID: comment.commentID, commentDescription: comment.commentDescription, userID: comment.userID, answerID: comment.answerID,
            });


            if (comment) {
                res.status(201).json({ message: 'Comment created successfully', comment });
            } else {
                res.status(500).json({ message: 'Error creating comment' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
//update a comment
export const updateComment = async (req: Request, res: Response) => {
    try {
        const commentID = req.params.commentID;

        if (db.checkConnection() as unknown as boolean) {
            const commentFound: commentModel[] = await db.exec('getCommentById', { commentID: commentID });
            if (commentFound.length > 0) {
                const comment = {
                    commentID: commentFound[0].commentID,
                    commentDescription: req.body.commentDescription,
                    userID: req.body.userID,
                    answerID: req.body.answerID
                }


                const commentUpdated = await db.exec('updateComment', { commentID: comment.commentID, commentDescription: comment.commentDescription, userID: comment.userID, answerID: comment.answerID });
                if (commentUpdated) {
                    res.status(201).json({ message: 'Comment updated successfully', commentUpdated });
                }
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


// get comment by ID
export const getCommentById = async (req: ExtendedRequest, res: Response) => {
    try {
        const commentID = req.params.commentID;

        if (!commentID) {
            return res.status(400).json({ message: 'Comment ID not provided' });
        }

        if (db.checkConnection() as unknown as boolean) {
            const comment = await db.exec('getCommentById', { commentID: commentID });

            if (comment && comment.length > 0) {
                res.status(200).json(comment[0]);
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// get all comments
export const getAllComments = async (req: Request, res: Response) => {
    try {
        if (db.checkConnection() as unknown as boolean) {
            const comments: commentModel[] = await db.exec('getAllComments');

            if (comments.length > 0) {
                res.status(200).json(comments);
            } else {
                res.status(200).json({ message: 'No comments found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
// delete comment
export const deleteComment = async (req: ExtendedRequest, res: Response) => {
    try {
        const commentID = req.params.commentID;


        if (db.checkConnection() as unknown as boolean) {
            const commentFound = await db.exec('getCommentById', { commentID: commentID });

            if (commentFound && commentFound.length > 0) {
                await db.exec('deleteComment', { commentID: commentID });
                res.status(200).json({ message: 'Comment deleted successfully' });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};