import express, { Express } from 'express'
import userRouter from './Routers/userRouter';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use('/users', userRouter)


const PORT = process.env.PORT
app.listen(4003, () => {
    console.log(`Server is running on port ${PORT}`);
})
