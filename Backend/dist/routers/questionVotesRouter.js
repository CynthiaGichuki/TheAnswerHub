"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questionVotesContoller_1 = require("../controllers/questionVotesContoller");
const questionVotesRouter = (0, express_1.Router)();
questionVotesRouter.post("/addquestionVotes", questionVotesContoller_1.InsertOrUpdateQuestionVote);
questionVotesRouter.get('', questionVotesContoller_1.getAllQuesitonVotes);
questionVotesRouter.get("/:voteID", questionVotesContoller_1.getQuestionVoteByID);
exports.default = questionVotesRouter;
