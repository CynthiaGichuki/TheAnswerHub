"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answerVotesController_1 = require("../controllers/answerVotesController");
const verifyToken_middleware_1 = require("../Middlewares/verifyToken.middleware");
const answerVotesRouter = (0, express_1.Router)();
answerVotesRouter.post("/addanswerVote", verifyToken_middleware_1.verifyToken, answerVotesController_1.InsertOrUpdateAnswerVote);
answerVotesRouter.get('', verifyToken_middleware_1.verifyToken, answerVotesController_1.getAllAnswerVotes);
answerVotesRouter.get("/:voteID", verifyToken_middleware_1.verifyToken, answerVotesController_1.getAnswerVoteByID);
exports.default = answerVotesRouter;
