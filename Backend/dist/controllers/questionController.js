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
exports.addQuestion = void 0;
const uuid_1 = require("uuid");
const dbConnection_1 = __importDefault(require("../databaseHelpers/dbConnection"));
const questionValidate_1 = require("../helpers/questionValidate");
// interface ExtendedRequest extends Request {
//     body: {
//         title: string;
//         tagName: string;
//         userID: string;
//     },
//     params: {
//         questionID: string;
//     }
// }
//Add a new question
const addQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = {
            questionID: (0, uuid_1.v4)(),
            title: req.body.title,
            tagName: req.body.title,
            userID: req.body.userID,
            is_deleted: req.body.is_deleted,
            created_at: new Date().toISOString(),
            upadted_at: new Date().toISOString()
        };
        const { error } = (0, questionValidate_1.validateQuestion)(question);
        if (error)
            return res.status(400).send(error.details[0].message);
        if (dbConnection_1.default.checkConnection()) {
            const insertedQuestion = yield dbConnection_1.default.exec("InsertOrUpdateQuestion", Object.assign({}, question));
            if (insertedQuestion) {
                res.status(200).send(insertedQuestion);
            }
            else {
                res.status(500).send("Error adding new question");
            }
        }
        else {
            res.status(500).send("Error adding new question");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error adding new question");
    }
});
exports.addQuestion = addQuestion;
