"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answerVotesController_1 = require("../controllers/answerVotesController");
const answerVotesRouter = (0, express_1.Router)();
answerVotesRouter.post("/addanswerVote", answerVotesController_1.InsertOrUpdateAnswerVote);
answerVotesRouter.get('', answerVotesController_1.getAllAnswerVotes);
answerVotesRouter.get("/:voteID", answerVotesController_1.getAnswerVoteByID);
exports.default = answerVotesRouter;
