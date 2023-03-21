"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuesitonVotes = exports.getQuestionVoteByID = exports.InsertOrUpdateQuestionVote = void 0;
const uuid_1 = require("uuid");
const dbConnection_1 = __importDefault(require("../databaseHelpers/dbConnection"));
//add question vote
const InsertOrUpdateQuestionVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, questionID, vote_type } = req.body;
        const vote = {
            voteID: (0, uuid_1.v4)(),
            userID: userID,
            questionID: questionID,
            vote_type: vote_type
        };
        if (!vote.userID || !vote.questionID || !vote.vote_type) {
            return res.status(400).json({ message: 'Missing parameters' });
        }
        if (dbConnection_1.default.checkConnection()) {
            const existingVote = yield dbConnection_1.default.exec('InsertOrUpdateQuestionVote', { userID: vote.userID, questionID: vote.questionID });
            if (existingVote.length > 0) {
                // If the user has already voted, update the existing vote
                const updatedVote = yield dbConnection_1.default.exec('InsertOrUpdateQuestionVote', { voteID: existingVote[0].voteID, userID: vote.userID, questionID: vote.questionID, voteType: vote.vote_type });
                if (updatedVote) {
                    res.status(200).json({ message: 'Vote updated successfully' });
                }
                else {
                    res.status(500).json({ message: 'Error updating vote' });
                }
            }
            else {
                // If the user has not voted, insert a new vote
                const newVote = yield dbConnection_1.default.exec('InsertOrUpdateQuestionVote', { voteID: vote.voteID, userID: vote.userID, questionID: vote.questionID, voteType: vote.vote_type });
                if (newVote) {
                    res.status(200).json({ message: 'Vote added successfully' });
                }
                else {
                    res.status(500).json({ message: 'Error adding vote' });
                }
            }
        }
        else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.InsertOrUpdateQuestionVote = InsertOrUpdateQuestionVote;
//get question vote by ID
const getQuestionVoteByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const voteID = req.params.voteID;
        if (!voteID) {
            return res.status(400).json({ message: 'Vote ID not provided' });
        }
        if (dbConnection_1.default.checkConnection()) {
            const vote = yield dbConnection_1.default.exec('getQuestionVoteByID', { voteID: voteID });
            if (vote) {
                res.status(200).json(vote[0]);
            }
            else {
                res.status(404).json({ message: 'Vote Not found' });
            }
        }
        else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getQuestionVoteByID = getQuestionVoteByID;
//get All Question votes
const getAllQuesitonVotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (dbConnection_1.default.checkConnection()) {
            const questionVotes = yield dbConnection_1.default.exec('getAllQuestionVotes');
            if (questionVotes.length > 0) {
                res.status(200).json(questionVotes);
            }
            else {
                res.status(200).json({ message: 'No Question Votes found' });
            }
        }
        else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllQuesitonVotes = getAllQuesitonVotes;
