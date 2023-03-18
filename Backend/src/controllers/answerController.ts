import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import db from '../databaseHelpers/dbConnection';
import answerModel from '../Models/answerModel';
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

interface ExtendedRequest extends Request {
  body: {
    answerDescription: string;
    questionID: string;
    userID: string;

  },
  params: {
    answerID: string;
  }
}

//create a new answer
export const addAnswer = async (req: Request, res: Response) => {
  try {
    const { answerDescription, questionID, userID } = req.body;

    const answerID = uuidv4() as string;

    if (db.checkConnection() as unknown as boolean) {
      const answerCreated = await db.exec('InsertOrUpdateAnswer', {
        answerID,
        answerDescription,
        questionID,
        userID,
      });

      if (answerCreated) {
        res.status(200).json({ message: 'Answer created successfully' });
      } else {
        res.status(500).json({ message: 'Error creating answer' });
      }
    } else {
      res.status(500).json({ message: 'Error connecting to database' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


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

      if (answer) {
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

