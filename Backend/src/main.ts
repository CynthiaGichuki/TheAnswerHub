import express, { Express } from 'express'
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import answerRouter from './routers/answerRouter';
import commentRouter from './routers/commentRouter';
import userRouter from './routers/userRouter';
import questionRouter from './routers/questionRouter';
import answerVotesRouter from './routers/answerVotesRouter';
import questionVotesRouter from './routers/questionVotesRouter';

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/questions', questionRouter)
app.use('/answers', answerRouter)
app.use('/comments', commentRouter)
app.use('/answerVotes', answerVotesRouter)
app.use('/questionVotes', questionVotesRouter)


const PORT = process.env.PORT
app.listen(4003, () => {
    console.log(`Server is running on port ${PORT}`);
})
