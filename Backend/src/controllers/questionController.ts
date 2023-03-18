import { Request, Response, RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../databaseHelpers/dbConnection';
import { validateQuestion } from '../helpers/questionValidate';
import questionModel from '../Models/questionModel';


interface ExtendedRequest extends Request {
    body: {
        title: string;
        description: string;
        tagName: string;
        userID: string;
    },
    params: {
        questionID: string;
    }
}

//Add a new question

export const addQuestion: RequestHandler = async (req: Request, res: Response) => {

    try {
        const { title, description, tagName, userID, is_deleted} = req.body;

        const question = {
            questionID: uuidv4() as string,
            title: title as string,
            description: description as string,
            tagName: tagName as string,
            userID: userID as string,
            is_deleted: is_deleted as string,
        }

        // const { error } = validateQuestion(question);
        // if (error) return res.status(400).send(error.details[0].message);


        if (db.checkConnection() as unknown as boolean) {
            const insertedQuestion = await db.exec("InsertOrUpdateQuestion", {...question });

            if (insertedQuestion) {
                res.status(200).send(insertedQuestion);
            }
            else {
                res.status(500).send("Error adding new question");
            }

        } else {
            res.status(500).send("Error adding new question");
        }

    } catch (error) {

        console.log(error);

        res.status(500).send("Error adding new question");

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
            // console.log(question);

            if (question) {
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
        // console.log("body", req.body);

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
                    // created_at: new Date().toISOString(),
                    // updated_at: new Date().toISOString(),
                }

                const questionUpdated = await db.exec('InsertOrUpdateQuestion', question);
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
export const getQuestionByVoteCount = async (req: ExtendedRequest, res: Response) => {
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
                res.status(500).json({ message: 'Question not found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}