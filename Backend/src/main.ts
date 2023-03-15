import express, { json } from 'express'

const app = express()

//middlewares
app.use(json())

app.listen(4000, () => {
    console.log("App is running...");

})