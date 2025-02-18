import nodemailer from 'nodemailer';

export const emailAccount = "william.crona@ethereal.email"

let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: emailAccount,
        pass: '8ZzgJfFTKYKDCmHF1U'
    }
});

export default transporter