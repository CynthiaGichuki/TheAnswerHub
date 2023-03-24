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
exports.getAllQuesitonVotes = exports.getQuestionVoteByID = exports.addQuestionVote = void 0;
const uuid_1 = require("uuid");
const dbConnection_1 = __importDefault(require("../databaseHelpers/dbConnection"));
const questionVotesValidate_1 = require("../helpers/questionVotesValidate");
//add question vote
const addQuestionVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vote = {
            voteID: (0, uuid_1.v4)(),
            userID: req.body.userID,
            questionID: req.body.questionID,
            vote_type: req.body.vote_type
        };
        const { error } = (0, questionVotesValidate_1.validateQuestionVotes)(vote);
        if (error)
            return res.status(400).send(error.details[0].message);
        if (dbConnection_1.default.checkConnection()) {
            // Check if the user has already voted for this question
            const existingVote = yield dbConnection_1.default.exec("GetQuestionVote", { userID: vote.userID, questionID: vote.questionID });
            if (existingVote) {
                // If the user has already voted, update the existing vote
                const updatedVote = yield dbConnection_1.default.exec("updateQuestionVote", { voteID: vote.voteID, userID: vote.userID, questionID: vote.questionID, vote_type: vote.vote_type });
                if (updatedVote) {
                    res.status(200).json({ message: "Question vote updated successfully" });
                }
                else {
                    res.status(422).send({ message: "Error updating question vote" });
                }
            }
            else {
                // If the user has not voted, insert a new vote
                const savedVote = yield dbConnection_1.default.exec("addQuestionVote", { voteID: vote.voteID, userID: vote.userID, questionID: vote.questionID, vote_type: vote.vote_type });
                if (savedVote) {
                    res.status(201).json({ message: "Question vote added successfully" });
                }
                else {
                    res.status(422).send({ message: "Error adding question vote" });
                }
            }
        }
        else {
            res.status(500).send({ message: "Error connecting to database" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.addQuestionVote = addQuestionVote;
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
