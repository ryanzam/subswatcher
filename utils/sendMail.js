import dayjs from "dayjs";
import transporter, { emailAccount } from "../config/nodemailer.js";

export const sendEmailReminder = async ({ toEmail, subs }) => {
    if (!toEmail) throw new Error("Parameters missing")

    const daysLeft = dayjs(subs.renewDate).diff(dayjs(), "days") + 1

    const mailOptions = {
        from: emailAccount, // sender address
        to: toEmail, // list of receivers
        subject: `📅 Reminder: Your ${subs.name} Subscription Renews in ${daysLeft} days!`,
        html: `<b>Hello, Your subscription renews in  ${daysLeft} days/b>`, // html body
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error, "Error sending an email.")

        console.log(`Email sent to ${toEmail} : ` + info.response)
    })
}