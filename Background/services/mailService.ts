import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'
import sendMail from '../helpers/emailHelper'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
import dbConfig from '../../Backend/src/config/dbConfig'
interface User {
    userID: string;
    fullname: string;
    email: string;
    username: string;
    password: string;
    is_admin: string;
    is_deleted: string;
}
const sendWelcomeEmail = async () => {
    const pool = await mssql.connect(dbConfig)
    const users: User[] = await (await pool.request().
        query("SELECT * FROM Users WHERE is_sent ='0'")).recordset

    for (let user of users) {
        ejs.renderFile('C:\Users\Lenovo\Documents\TheJitu Final Project\Background\services\templates\registration.ejs', { name: user.email }, async (error: any, html: any) => {
            console.log("html", html);
            console.log("error", error);
            const message = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Welcome to TheAnswerHub ",
                html
            };



            try {
                await sendMail(message)
                await pool.request().query(`UPDATE Users SET is_sent ='1' WHERE userID ='${user.userID}'`)
            } catch (error) {
                console.log(error);

            }
        })
    }
}

export default sendWelcomeEmail