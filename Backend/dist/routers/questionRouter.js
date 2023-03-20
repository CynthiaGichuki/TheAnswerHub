"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questionController_1 = require("../controllers/questionController");
const questionRouter = (0, express_1.Router)();
questionRouter.get('', questionController_1.getAllQuestions);
questionRouter.post("/addQuestion", questionController_1.addQuestion);
questionRouter.get("/:questionID", questionController_1.getQuestionById);
questionRouter.get("/voteCount/:questionID", questionController_1.getQuestionByVoteCount);
questionRouter.delete("/:questionID", questionController_1.deleteQuestion);
exports.default = questionRouter;