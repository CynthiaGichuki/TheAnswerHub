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
exports.deleteQuestion = exports.getQuestionVoteCount = exports.updateQuestion = exports.getQuestionById = exports.getAllQuestions = exports.addQuestion = void 0;
const uuid_1 = require("uuid");
const dbConnection_1 = __importDefault(require("../databaseHelpers/dbConnection"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
//Add a new question
const addQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = {
            questionID: (0, uuid_1.v4)(),
            title: req.body.title,
            description: req.body.description,
            tagName: req.body.tagName,
            userID: req.body.userID
        };
        // const { error } = validateQuestion(question)
        // if (error) return res.status(400).send(error.details[0].message)
        if (dbConnection_1.default.checkConnection()) {
            const savedQuestion = yield dbConnection_1.default.exec("createQuestion", { questionID: question.questionID, title: question.title, description: question.description, tagName: question.tagName, userID: question.userID, is_deleted: '0' });
            if (savedQuestion) {
                res.status(201).json({ message: "Question Created Successfully" });
            }
            else {
                res.status(422).send({ message: "Error creating question" });
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
exports.addQuestion = addQuestion;
//get All Questions
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (dbConnection_1.default.checkConnection()) {
            const questions = yield dbConnection_1.default.exec('getAllQuestions');
            if (questions.length > 0) {
                res.status(200).json(questions);
            }
            else {
                res.status(200).json({ message: 'No questions found' });
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
exports.getAllQuestions = getAllQuestions;
//get Question by ID
const getQuestionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionID = req.params.questionID;
        if (!questionID) {
            return res.status(400).json({ message: 'Question ID not provided' });
        }
        if (dbConnection_1.default.checkConnection()) {
            const question = yield dbConnection_1.default.exec('GetQuestionById', { questionID: questionID });
            if (question && question.length > 0) {
                res.status(200).json(question[0]);
            }
            else {
                res.status(404).json({ message: 'Question Not found' });
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
exports.getQuestionById = getQuestionById;
//update a question
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionID = req.params.questionID;
        if (dbConnection_1.default.checkConnection()) {
            const questionFound = yield dbConnection_1.default.exec('GetQuestionById', { questionID: questionID });
            if (questionFound.length > 0) {
                const question = {
                    questionID: questionFound[0].questionID,
                    title: req.body.title,
                    description: req.body.description,
                    tagName: req.body.tagName,
                    userID: req.body.userID,
                    is_deleted: req.body.is_deleted,
                };
                const questionUpdated = yield dbConnection_1.default.exec('updateQuestion', { questionID: question.questionID, title: question.title, description: question.description, tagName: question.tagName, userID: question.userID, is_deleted: '0' });
                if (questionUpdated) {
                    res.status(200).json({ message: 'Question updated successfully', questionUpdated });
                }
            }
            else {
                res.status(500).json({ message: 'Question not found' });
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
exports.updateQuestion = updateQuestion;
//get Question Vote Count
const getQuestionVoteCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionID = req.params.questionID;
        if (!questionID) {
            return res.status(400).json({ message: 'Question ID not provided' });
        }
        if (dbConnection_1.default.checkConnection()) {
            const voteCountResult = yield dbConnection_1.default.exec('getQuestionVoteCount', { questionID: questionID });
            const voteCount = voteCountResult[0].voteCount;
            res.status(200).json({ voteCount: voteCount });
        }
        else {
            res.status(500).json({ message: 'Error connecting to database' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getQuestionVoteCount = getQuestionVoteCount;
//delete Question
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionID = req.params.questionID;
        if (dbConnection_1.default.checkConnection()) {
            const questionFound = yield dbConnection_1.default.exec('GetQuestionById', { questionID: questionID });
            if (questionFound.length > 0) {
                yield dbConnection_1.default.exec('deleteQuestion', { questionID: questionFound[0].questionID });
                res.status(200).json({ message: 'Question deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Question not found' });
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
exports.deleteQuestion = deleteQuestion;
