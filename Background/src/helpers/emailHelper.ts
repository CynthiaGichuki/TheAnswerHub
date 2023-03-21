import nodemailer from 'nodemailer'
import emailConfig from '../config/emailConfig'

function createTransporter(config: any) {
    return nodemailer.createTransport(config)
}

const sendMail = async (messageOptions: any) => {
    let transporter = createTransporter(emailConfig)
    await transporter.verify()
    await transporter.sendMail(messageOptions, (error, info) => {
        console.log(info);

    })
}
export default sendMail