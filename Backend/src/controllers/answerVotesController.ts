import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../databaseHelpers/dbConnection';
import answerVotesModel from '../Models/answerVotesModel';


interface ExtendedRequest extends Request {
    body: {
        userID: string;
        answerID: string;
        vote_type: string;

    },
    params: {
        voteID: string;
    }
}

//add new answer vote

export const insertOrUpdateAnswerVote = async (req: Request, res: Response) => {
    try {
        const { userID, answerID, vote_type } = req.body;
        const vote = {
            voteID: uuidv4() as string,
            userID: userID as string,
            answerID: answerID as string,
            vote_type: vote_type as string 
        };

        if (!vote.userID || !vote.answerID || !vote.vote_type) {
            return res.status(400).json({ message: 'Missing parameters' });
        }

        if (db.checkConnection() as unknown as boolean) {
            const existingVote = await db.exec('InsertorUpdateAnswerVote', { userID: vote.userID, answerID: vote.answerID });

            if (existingVote.length > 0) {
                // If the user has already voted, update the existing vote
                const updatedVote = await db.exec('InsertorUpdateAnswerVote', { voteID: existingVote[0].voteID, userID: vote.userID, answerID: vote.answerID, voteType: vote.vote_type });

                if (updatedVote) {
                    res.status(200).json({ message: 'Vote updated successfully' });
                } else {
                    res.status(500).json({ message: 'Error updating vote' });
                }
            } else {
                // If the user has not voted, insert a new vote
                const newVote = await db.exec('InsertorUpdateAnswerVote', { voteID: vote.voteID, userID: vote.userID, answerID: vote.answerID, voteType: vote.vote_type });

                if (newVote) {
                    res.status(200).json({ message: 'Vote added successfully' });
                } else {
                    res.status(500).json({ message: 'Error adding vote' });
                }
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

//get Answer Vote By ID
export const getAnswerVoteByID = async (req: ExtendedRequest, res: Response) => {
    try {
        const voteID = req.params.voteID

        if (!voteID) {
            return res.status(400).json({ message: 'Vote ID not provided' });
        }

        if (db.checkConnection() as unknown as boolean) {
            const vote: answerVotesModel[] = await db.exec('getAnswerVoteByID', { voteID: voteID }) as unknown as answerVotesModel[]

            if (vote) {
                res.status(200).json(vote[0])
            } else {
                res.status(404).json({ message: 'Vote Not found' })
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//get All Answer Votes
export const getAllAnswerVotes = async (req: Request, res: Response) => {
    try {
        if (db.checkConnection() as unknown as boolean) {
            const answerVotes: answerVotesModel[] = await db.exec('getAllAnswerVotes');

            if (answerVotes.length > 0) {
                res.status(200).json(answerVotes);
            } else {
                res.status(200).json({ message: 'No Answer Votes found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

//getAnswerDownVotes

