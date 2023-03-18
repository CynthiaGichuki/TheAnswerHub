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
exports.deleteAnswer = exports.getAnswerVoteCount = exports.getAnswerById = exports.getAllAnswers = exports.addAnswer = void 0;
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dbConnection_1 = __importDefault(require("../databaseHelpers/dbConnection"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
//create a new answer
const addAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answerDescription, questionID, userID } = req.body;
        const answerID = (0, uuid_1.v4)();
        if (dbConnection_1.default.checkConnection()) {
            const answerCreated = yield dbConnection_1.default.exec('InsertOrUpdateAnswer', {
                answerID,
                answerDescription,
                questionID,
                userID,
            });
            if (answerCreated) {
                res.status(200).json({ message: 'Answer created successfully' });
            }
            else {
                res.status(500).json({ message: 'Error creating answer' });
            }
        }
        else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.addAnswer = addAnswer;
//getting all answers
const getAllAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (dbConnection_1.default.checkConnection()) {
            const answers = yield dbConnection_1.default.exec('getAllAnswers');
            if (answers.length > 0) {
                res.status(200).json(answers);
            }
            else {
                res.status(200).json({ message: 'No answers found' });
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
exports.getAllAnswers = getAllAnswers;
//get Answer by ID
const getAnswerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answerID = req.params.answerID;
        if (!answerID) {
            return res.status(400).json({ message: 'Answer ID not provided' });
        }
        if (dbConnection_1.default.checkConnection()) {
            const answer = yield dbConnection_1.default.exec('GetAnswerById', { answerID: answerID });
            if (answer) {
                res.status(200).json(answer[0]);
            }
            else {
                res.status(404).json({ message: 'Answer Not found' });
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
exports.getAnswerById = getAnswerById;
//get answervote count
const getAnswerVoteCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answerID = req.params.answerID;
        if (!answerID) {
            return res.status(400).json({ message: 'Answer ID not provided' });
        }
        if (dbConnection_1.default.checkConnection()) {
            const result = yield dbConnection_1.default.exec('getAnswerVoteCount', { answerID });
            if (result && result[0] && result[0].voteCount !== undefined) {
                const voteCount = result[0].voteCount;
                res.status(200).json({ voteCount });
            }
            else {
                res.status(404).json({ message: 'Answer not found or has no votes' });
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
exports.getAnswerVoteCount = getAnswerVoteCount;
//delete answer
const deleteAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answerID = req.params.answerID;
        if (dbConnection_1.default.checkConnection()) {
            const answerFound = yield dbConnection_1.default.exec('GetAnswerById', { answerID: answerID });
            if (answerFound.length > 0) {
                yield dbConnection_1.default.exec('deleteAnswer', { answerID: answerFound[0].answerID });
                res.status(200).json({ message: 'Answer deleted successfully' });
            }
            else {
                res.status(500).json({ message: 'Answer not found' });
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
exports.deleteAnswer = deleteAnswer;
