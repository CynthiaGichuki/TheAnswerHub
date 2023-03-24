import { Request, Response, RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../databaseHelpers/dbConnection';
import { validateQuestion } from '../helpers/questionValidate';
import questionModel from '../Models/questionModel';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
    body: {
        users?: any;
        title: string;
        description: string;
        tagName: string;
        userID: string;
        is_deleted: string;
        created_at: string
    },
    params: {
        questionID: string;
    }
}

//Add a new question

export const addQuestion = async (req: ExtendedRequest, res: Response) => {
    try {
        const question = {
            questionID: uuid() as string,
            title: req.body.title as string,
            description: req.body.description as string,
            tagName: req.body.tagName as string,
            userID: req.body.users.userID as string,
            // userID: req.body.userID as string,
            is_deleted: req.body.is_deleted as string,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),

        }

        const { error } = validateQuestion(question)
        if (error) return res.status(400).send(error.details[0].message)

        if (db.checkConnection() as unknown as boolean) {
            const savedQuestion = await db.exec("createQuestion", { questionID: question.questionID, title: question.title, description: question.description, tagName: question.tagName, userID: question.userID, is_deleted: '0' })

            if (savedQuestion) {

                res.status(201).json({ message: "Question Created Successfully", question })
            } else {
                res.status(422).send({ message: "Error creating question" })
            }
        } else {
            res.status(500).send({ message: "Error connecting to database" })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

//get All Questions
export const getAllQuestions = async (req: Request, res: Response) => {
    try {
        if (db.checkConnection() as unknown as boolean) {
            const questions: questionModel[] = await db.exec('getAllQuestions');

            if (questions.length > 0) {
                res.status(200).json(questions);
            } else {
                res.status(200).json({ message: 'No questions found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

//get Question by ID
export const getQuestionById = async (req: ExtendedRequest, res: Response) => {
    try {
        const questionID = req.params.questionID

        if (!questionID) {
            return res.status(400).json({ message: 'Question ID not provided' });
        }

        if (db.checkConnection() as unknown as boolean) {
            const question: questionModel[] = await db.exec('GetQuestionById', { questionID: questionID }) as unknown as questionModel[]

            if (question && question.length > 0) {
                res.status(200).json(question[0])
            } else {
                res.status(404).json({ message: 'Question Not found' })
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//update a question
export const updateQuestion = async (req: Request, res: Response) => {
    try {
        const questionID = req.params.questionID;

        if (db.checkConnection() as unknown as boolean) {
            const questionFound: questionModel[] = await db.exec('GetQuestionById', { questionID: questionID });
            if (questionFound.length > 0) {
                const question = {
                    questionID: questionFound[0].questionID,
                    title: req.body.title,
                    description: req.body.description,
                    tagName: req.body.tagName,
                    userID: req.body.userID,
                    is_deleted: req.body.is_deleted,
                }

                const questionUpdated = await db.exec('updateQuestion', { questionID: question.questionID, title: question.title, description: question.description, tagName: question.tagName, userID: question.userID, is_deleted: '0' });
                if (questionUpdated) {
                    res.status(200).json({ message: 'Question updated successfully', questionUpdated });
                }
            } else {
                res.status(500).json({ message: 'Question not found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


//get Question Vote Count
export const getQuestionVoteCount = async (req: ExtendedRequest, res: Response) => {
    try {
        const questionID = req.params.questionID;

        if (!questionID) {
            return res.status(400).json({ message: 'Question ID not provided' });
        }

        if (db.checkConnection() as unknown as boolean) {
            const voteCountResult = await db.exec('getQuestionVoteCount', { questionID: questionID });

            const voteCount = voteCountResult[0].voteCount;

            res.status(200).json({ voteCount: voteCount });
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


//delete Question
export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const questionID = req.params.questionID;
        if (db.checkConnection() as unknown as boolean) {
            const questionFound: questionModel[] = await db.exec('GetQuestionById', { questionID: questionID });

            if (questionFound.length > 0) {

                await db.exec('deleteQuestion', { questionID: questionFound[0].questionID });


                res.status(200).json({ message: 'Question deleted successfully' });

            } else {
                res.status(404).json({ message: 'Question not found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}