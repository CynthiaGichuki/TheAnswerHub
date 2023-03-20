
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env') })

let Emailconfig = {
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    auth: {
        user: 'gichukicynthia1@gmail.com',
        pass: 'HelloThere2023!!'
    }
}


export default Emailconfig