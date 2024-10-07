import nodemailer from 'nodemailer'
import 'dotenv/cinfig'
import path from 'path';
import ejs from 'ejs'

const mailFunction = async (to: string, user: string, subject: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const sendMail = async (user: any) => {
        try {
            
            const template = path.join(__dirname, '../../ejs', 'index.ejs');

            const content = await ejs.renderFile(template, { user });

            const mailOption = {
                from: process.env.EMAIL,
                to,
                subject,
                html: content
            };

            transporter.sendMail(mailOption, function (err, info) {
                if (err) {
                    console.error('Error sending email:', err);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        } catch (error) {
            console.error('Error rendering email template:', error);
        }
    };

    sendMail(user);
};

export default mailFunction;

