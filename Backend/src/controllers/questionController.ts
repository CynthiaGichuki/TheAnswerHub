import { Request, Response, RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../databaseHelpers/dbConnection';
import { validateQuestion } from '../helpers/questionValidate';
import questionModel from '../Models/questionModel';


// interface ExtendedRequest extends Request {
//     body: {
//         title: string;
//         tagName: string;
//         userID: string;
//     },
//     params: {
//         questionID: string;
//     }
// }

//Add a new question

export const addQuestion: RequestHandler = async (req: Request, res: Response) => {

    try {
        const question: questionModel = {
            questionID: uuidv4() as string,
            title: req.body.title,
            tagName: req.body.title,
            userID: req.body.userID,
            is_deleted: req.body.is_deleted,
            created_at: new Date().toISOString(),
            upadted_at: new Date().toISOString()
        }

        const { error } = validateQuestion(question);
        if (error) return res.status(400).send(error.details[0].message);


        if (db.checkConnection() as unknown as boolean) {
            const insertedQuestion = await db.exec("InsertOrUpdateQuestion", { ...question });

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


