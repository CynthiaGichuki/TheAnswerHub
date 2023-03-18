"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./Routers/userRouter"));
const questionRouter_1 = __importDefault(require("./Routers/questionRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const answerRouter_1 = __importDefault(require("./Routers/answerRouter"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/users', userRouter_1.default);
app.use('/questions', questionRouter_1.default);
app.use('/answers', answerRouter_1.default);
const PORT = process.env.PORT;
app.listen(4003, () => {
    console.log(`Server is running on port ${PORT}`);
});
