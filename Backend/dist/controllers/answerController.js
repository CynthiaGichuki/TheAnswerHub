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
exports.deleteAnswer = exports.updateAnswer = exports.getAnswerVoteCount = exports.getAnswerById = exports.getAllAnswers = exports.addAnswer = void 0;
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dbConnection_1 = __importDefault(require("../databaseHelpers/dbConnection"));
const answerValidate_1 = require("../helpers/answerValidate");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
//create a new answer
const addAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answer = {
            answerID: (0, uuid_1.v4)(),
            answerDescription: req.body.answerDescription,
            questionID: req.body.questionID,
            userID: req.body.userID,
            created_at: new Date().toISOString(),
        };
        const { error } = (0, answerValidate_1.validateAnswer)(answer);
        if (error)
            return res.status(400).send(error.details[0].message);
        if (dbConnection_1.default.checkConnection()) {
            const answerCreated = yield dbConnection_1.default.exec("addAnswer", { answerID: answer.answerID, answerDescription: answer.answerDescription, questionID: answer.questionID, userID: answer.userID });
            // console.log(answerCreated);
            if (answerCreated) {
                res.status(201).json({ message: "Answer Added Successfully" });
            }
            else {
                res.status(422).send({ message: "Error creating answer" });
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
            if (answer && answer.length > 0) {
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
//update an answer
const updateAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answerID = req.params.answerID;
        if (dbConnection_1.default.checkConnection()) {
            const answerFound = yield dbConnection_1.default.exec('GetAnswerById', { answerID: answerID });
            if (answerFound.length > 0) {
                const answer = {
                    answerID: answerFound[0].answerID,
                    answerDescription: req.body.answerDescription,
                    questionID: req.body.questionID,
                    userID: req.body.userID
                };
                const answerUpdated = yield dbConnection_1.default.exec('updateAnswer', { answerID: answer.answerID, answerDescription: answer.answerDescription, questionID: answer.questionID, userID: answer.userID });
                if (answerUpdated) {
                    res.status(201).json({ message: 'Answer updated successfully', answerUpdated });
                }
            }
            else {
                res.status(404).json({ message: 'Answer not found' });
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
exports.updateAnswer = updateAnswer;
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
