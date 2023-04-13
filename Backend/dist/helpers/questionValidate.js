"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuestion = void 0;
const joi_1 = __importDefault(require("joi"));
// validate product fields
const questionSchema = joi_1.default.object({
    questionID: joi_1.default.string().min(3).max(255).required(),
    title: joi_1.default.string().min(3).max(255).required(),
    description: joi_1.default.string().min(3).max(255).required(),
    tagName: joi_1.default.string().min(3).max(255).required(),
    userID: joi_1.default.string().min(3).max(255).required(),
    is_deleted: joi_1.default.string().required(),
    created_at: joi_1.default.string().required(),
    updated_at: joi_1.default.string().required(),
});
const validateQuestion = (question) => {
    return questionSchema.validate(question);
};
exports.validateQuestion = validateQuestion;
