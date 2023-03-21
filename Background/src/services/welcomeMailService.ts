import mssql from 'mssql'
import emailConfig from '../config/emailConfig'
import sendMail from '../helpers/emailHelper'
import ejs from 'ejs'
import path from 'path'
import dotenv from 'dotenv'
import sqlConfig from '../config/dbConfig'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const sendWelcomeEmail = async () => {
  try {
    const pool = await mssql.connect(sqlConfig)
    const users = await pool.request().query(`SELECT * FROM Users WHERE is_sent = 0`)
    const usersList = users.recordset


    for (let i = 0; i < usersList.length; i++) {
      let URL = `http://localhost:4000/verify/${usersList[i].userID}`

      ejs.renderFile(path.resolve(__dirname, '../templates/registration.ejs'), { name: usersList[i].fullname, URL: URL }, async (error, data) => {


        if (error) {
          console.log(error);
        } else {
          let mailOptions = {
            from: process.env.EMAIL,
            to: usersList[i].email,
            subject: 'Welcome To TheAnswerHub',
            html: data
          }
          await sendMail(mailOptions)
          await pool.request().query(`UPDATE Users SET is_sent = 1 WHERE userID ='${usersList[i].userID}'`)
        }
      })
      // console.log(usersList[i].username)
    }
  } catch (error) {
    console.log(error);
  }
}




