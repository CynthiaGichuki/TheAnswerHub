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
exports.deleteComment = exports.getAllComments = exports.getCommentById = exports.updateComment = exports.addComment = void 0;
const uuid_1 = require("uuid");
const dbConnection_1 = __importDefault(require("../databaseHelpers/dbConnection"));
const commentValidate_1 = require("../helpers/commentValidate");
// create a new comment
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = {
            commentID: (0, uuid_1.v4)(),
            commentDescription: req.body.answerDescription,
            userID: req.body.userID,
            answerID: req.body.answerID,
            created_at: new Date().toISOString(),
        };
        const { error } = (0, commentValidate_1.validateComment)(comment);
        if (error)
            return res.status(400).send(error.details[0].message);
        if (dbConnection_1.default.checkConnection()) {
            const commentCreated = yield dbConnection_1.default.exec('addComment', {
                commentID: comment.commentID, commentDescription: comment.commentDescription, userID: comment.userID, answerID: comment.answerID,
            });
            if (comment) {
                res.status(201).json({ message: 'Comment created successfully', comment });
            }
            else {
                res.status(500).json({ message: 'Error creating comment' });
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
exports.addComment = addComment;
//update a comment
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentID = req.params.commentID;
        if (dbConnection_1.default.checkConnection()) {
            const commentFound = yield dbConnection_1.default.exec('getCommentById', { commentID: commentID });
            if (commentFound.length > 0) {
                const comment = {
                    commentID: commentFound[0].commentID,
                    commentDescription: req.body.commentDescription,
                    userID: req.body.userID,
                    answerID: req.body.answerID
                };
                const commentUpdated = yield dbConnection_1.default.exec('updateComment', { commentID: comment.commentID, commentDescription: comment.commentDescription, userID: comment.userID, answerID: comment.answerID });
                if (commentUpdated) {
                    res.status(201).json({ message: 'Comment updated successfully', commentUpdated });
                }
            }
            else {
                res.status(404).json({ message: 'Comment not found' });
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
exports.updateComment = updateComment;
// get comment by ID
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentID = req.params.commentID;
        if (!commentID) {
            return res.status(400).json({ message: 'Comment ID not provided' });
        }
        if (dbConnection_1.default.checkConnection()) {
            const comment = yield dbConnection_1.default.exec('getCommentById', { commentID: commentID });
            if (comment && comment.length > 0) {
                res.status(200).json(comment[0]);
            }
            else {
                res.status(404).json({ message: 'Comment not found' });
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
exports.getCommentById = getCommentById;
// get all comments
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (dbConnection_1.default.checkConnection()) {
            const comments = yield dbConnection_1.default.exec('getAllComments');
            if (comments.length > 0) {
                res.status(200).json(comments);
            }
            else {
                res.status(200).json({ message: 'No comments found' });
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
exports.getAllComments = getAllComments;
// delete comment
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentID = req.params.commentID;
        if (dbConnection_1.default.checkConnection()) {
            const commentFound = yield dbConnection_1.default.exec('getCommentById', { commentID: commentID });
            if (commentFound && commentFound.length > 0) {
                yield dbConnection_1.default.exec('deleteComment', { commentID: commentID });
                res.status(200).json({ message: 'Comment deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Comment not found' });
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
exports.deleteComment = deleteComment;
