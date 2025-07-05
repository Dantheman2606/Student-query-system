const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// dotenv.config();

console.log(process.env.EMAIL_USER);
const sendVerificationEmail = async (user, token) => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
      });

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS
    //     }
    // });

    const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    //console.log(user);

    await transporter.sendMail({
        from: '"College Portal" <noreply@college.edu>',
        to: user.email,
        subject: 'Verify your email',
        html: `
      <p>Hi ${user.name},</p>
      <p>Click the link below to verify your email address:</p>
      <a href="${url}">${url}</a>
      <p>This link will expire in 24 hours.</p>
    `
    });
};

module.exports = sendVerificationEmail;
