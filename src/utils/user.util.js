const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'syedmazharali742@gmail.com',
        pass: 'wifncqjudispvcld'
    }
});


export const sendEmail = async (recipient, message) => {
    try {
        await transporter.sendMail({
            from: 'syedmazharali742@gmail.com',
            to: recipient,
            subject: 'Reset Password Link',
            text: `${message}`
        }, (err, res) => {
           
        });
    } catch (err) {
        throw new Error(err);
    }
}
