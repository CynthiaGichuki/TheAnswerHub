import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../databaseHelpers/dbConnection';
import { validateQuestionVotes } from '../helpers/questionVotesValidate';
import questionVotesModel from '../Models/questionVotesModel';

interface ExtendedRequest extends Request {
    body: {
        userID: string;
        questionID: string;
        vote_type: string;
    },

    params: {
        voteID: string;
    }
}

//add question vote
export const InsertOrUpdateQuestionVote = async (req: Request, res: Response) => {
    try {
        const { userID, questionID, vote_type } = req.body;
        const vote = {
            voteID: uuidv4() as string,
            userID: userID as string,
            questionID: questionID as string,
            vote_type: vote_type as string
        };

        const { error } = validateQuestionVotes(vote)
        if (error) return res.status(400).send(error.details[0].message)

        if (!vote.userID || !vote.questionID || !vote.vote_type) {
            return res.status(400).json({ message: 'Missing parameters' });
        }

        if (db.checkConnection() as unknown as boolean) {
            const existingVote = await db.exec('InsertOrUpdateQuestionVote', { userID: vote.userID, questionID: vote.questionID });

            if (existingVote.length > 0) {
                // If the user has already voted, update the existing vote
                const updatedVote = await db.exec('InsertOrUpdateQuestionVote', { voteID: existingVote[0].voteID, userID: vote.userID, questionID: vote.questionID, voteType: vote.vote_type });

                if (updatedVote) {
                    res.status(200).json({ message: 'Vote updated successfully' });
                } else {
                    res.status(500).json({ message: 'Error updating vote' });
                }
            } else {
                // If the user has not voted, insert a new vote
                const newVote = await db.exec('InsertOrUpdateQuestionVote', { voteID: vote.voteID, userID: vote.userID, questionID: vote.questionID, voteType: vote.vote_type });

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


//get question vote by ID
export const getQuestionVoteByID = async (req: ExtendedRequest, res: Response) => {
    try {
        const voteID = req.params.voteID

        if (!voteID) {
            return res.status(400).json({ message: 'Vote ID not provided' });
        }

        if (db.checkConnection() as unknown as boolean) {
            const vote: questionVotesModel[] = await db.exec('getQuestionVoteByID', { voteID: voteID }) as unknown as questionVotesModel[]

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

//get All Question votes

export const getAllQuesitonVotes = async (req: Request, res: Response) => {
    try {
        if (db.checkConnection() as unknown as boolean) {
            const questionVotes: questionVotesModel[] = await db.exec('getAllQuestionVotes');

            if (questionVotes.length > 0) {
                res.status(200).json(questionVotes);
            } else {
                res.status(200).json({ message: 'No Question Votes found' });
            }
        } else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}