import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
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
export const addQuestionVote = async (req: ExtendedRequest, res: Response) => {
    try {
        const vote = {
            voteID: uuid() as string,
            userID: req.body.userID as string,
            questionID: req.body.questionID as string,
            vote_type: req.body.vote_type as string
        }

        const { error } = validateQuestionVotes(vote)
        if (error) return res.status(400).send(error.details[0].message)

        if (db.checkConnection() as unknown as boolean) {
            // Check if the user has already voted for this question
            const existingVote = await db.exec("GetQuestionVote", { userID: vote.userID, questionID: vote.questionID })

            if (existingVote) {
                // If the user has already voted, update the existing vote
                const updatedVote = await db.exec("updateQuestionVote", { voteID: vote.voteID, userID: vote.userID, questionID: vote.questionID, vote_type: vote.vote_type })

                if (updatedVote) {
                    res.status(200).json({ message: "Question vote updated successfully" })
                } else {
                    res.status(422).send({ message: "Error updating question vote" })
                }
            } else {
                // If the user has not voted, insert a new vote
                const savedVote = await db.exec("addQuestionVote", { voteID: vote.voteID, userID: vote.userID, questionID: vote.questionID, vote_type: vote.vote_type })

                if (savedVote) {
                    res.status(201).json({ message: "Question vote added successfully" })
                } else {
                    res.status(422).send({ message: "Error adding question vote" })
                }
            }
        } else {
            res.status(500).send({ message: "Error connecting to database" })
        }
    } catch (error) {
        res.status(500).send(error)
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