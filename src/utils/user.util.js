const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'syedmazharali742@gmail.com',
        pass: 'wifncqjudispvcld'
    }
});


export const sendEmail = async (emailId, message) => {
    try {
        await transporter.sendMail({
            from: 'syedmazharali742@gmail.com',
            to: emailId,
            subject: 'Reset Password Link',
            text: `<html>
            <body>
            <a>${message}</a>
            </body>
            </html>`
        }, (err, res) => {
           
        });
    } catch (err) {
        throw new Error(err);
    }
}
