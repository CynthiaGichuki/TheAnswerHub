import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import path from 'path';
import db from '../databaseHelpers/dbConnection';
import answerModel from '../Models/answerModel';
import { validateAnswer } from '../helpers/answerValidate';
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
  body: {
    answerDescription: string;
    questionID: string;
    userID: string;
    created_at: string;

  },
  params: {
    answerID: string;
  }
}


//create a new answer
export const addAnswer = async (req: ExtendedRequest, res: Response) => {
  try {
    const answer = {
      answerID: uuid() as string,
      answerDescription: req.body.answerDescription as string,
      questionID: req.body.questionID as string,
      userID: req.body.userID as string,
      created_at: new Date().toISOString(),
    }

    const { error } = validateAnswer(answer)
    if (error) return res.status(400).send(error.details[0].message)

    if (db.checkConnection() as unknown as boolean) {
      const answerCreated = await db.exec("addAnswer", { answerID: answer.answerID, answerDescription: answer.answerDescription, questionID: answer.questionID, userID: answer.userID })
      // console.log(answerCreated);
      if (answerCreated) {

        res.status(201).json({ message: "Answer Added Successfully" })
      } else {
        res.status(422).send({ message: "Error creating answer" })
      }
    } else {
      res.status(500).send({ message: "Error connecting to database" })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}


//getting all answers
export const getAllAnswers = async (req: Request, res: Response) => {
  try {
    if (db.checkConnection() as unknown as boolean) {
      const answers: answerModel[] = await db.exec('getAllAnswers');

      if (answers.length > 0) {
        res.status(200).json(answers);
      } else {
        res.status(200).json({ message: 'No answers found' });
      }
    } else {
      res.status(500).json({ message: 'Error connecting to database' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

//get Answer by ID

export const getAnswerById = async (req: ExtendedRequest, res: Response) => {
  try {
    const answerID = req.params.answerID

    if (!answerID) {
      return res.status(400).json({ message: 'Answer ID not provided' });
    }

    if (db.checkConnection() as unknown as boolean) {
      const answer: answerModel[] = await db.exec('GetAnswerById', { answerID: answerID }) as unknown as answerModel[]

      if (answer && answer.length > 0) {
        res.status(200).json(answer[0])
      } else {
        res.status(404).json({ message: 'Answer Not found' })
      }
    } else {
      res.status(500).json({ message: 'Error connecting to database' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

//get answervote count
export const getAnswerVoteCount = async (req: ExtendedRequest, res: Response) => {
  try {
    const answerID = req.params.answerID;

    if (!answerID) {
      return res.status(400).json({ message: 'Answer ID not provided' });
    }

    if (db.checkConnection() as unknown as boolean) {
      const result = await db.exec('getAnswerVoteCount', { answerID });

      if (result && result[0] && result[0].voteCount !== undefined) {
        const voteCount = result[0].voteCount;
        res.status(200).json({ voteCount });
      } else {
        res.status(404).json({ message: 'Answer not found or has no votes' });
      }
    } else {
      res.status(500).json({ message: 'Error connecting to database' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//update an answer

export const updateAnswer = async (req: Request, res: Response) => {
  try {
    const answerID = req.params.answerID;

    if (db.checkConnection() as unknown as boolean) {
      const answerFound: answerModel[] = await db.exec('GetAnswerById', { answerID: answerID });
      if (answerFound.length > 0) {
        const answer = {
          answerID: answerFound[0].answerID,
          answerDescription: req.body.answerDescription,
          questionID: req.body.questionID,
          userID: req.body.userID
        }

        const answerUpdated = await db.exec('updateAnswer', { answerID: answer.answerID, answerDescription: answer.answerDescription, questionID: answer.questionID, userID: answer.userID });
        if (answerUpdated) {
          res.status(201).json({ message: 'Answer updated successfully', answerUpdated });
        }
      } else {
        res.status(404).json({ message: 'Answer not found' });
      }
    } else {
      res.status(500).json({ message: 'Error connecting to database' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// getAnswerDownVotes
// export const getAnswerDownVotes = async (req: ExtendedRequest, res: Response) => {
//   try {
//       const answerID = req.params.answerID;

//       if (!answerID) {
//           return res.status(400).json({ message: 'Answer ID not provided' });
//       }

//       if (db.checkConnection() as unknown as boolean) {
//           const downVotes = await db.exec('getAnswerDownVotes', { answerID: answerID }) [0]['downVotes'];

//           res.status(200).json({ downVotes: downVotes });
//       } else {
//           res.status(500).json({ message: 'Error connecting to database' })
//       }
//   } catch (error) {
//       res.status(500).json(error)
//   }
// }

//delete answer
export const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const answerID = req.params.answerID;
    if (db.checkConnection() as unknown as boolean) {
      const answerFound: answerModel[] = await db.exec('GetAnswerById', { answerID: answerID });

      if (answerFound.length > 0) {

        await db.exec('deleteAnswer', { answerID: answerFound[0].answerID });


        res.status(200).json({ message: 'Answer deleted successfully' });

      } else {
        res.status(500).json({ message: 'Answer not found' });
      }
    } else {
      res.status(500).json({ message: 'Error connecting to database' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

