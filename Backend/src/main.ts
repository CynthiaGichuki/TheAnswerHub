import express, { json } from 'express'
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const app = express()

//middlewares
app.use(json())


// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);   
// });

app.listen(4000, ()=>{
    console.log('Server is running on port 4000');
    
})