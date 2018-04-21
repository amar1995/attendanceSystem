const nodemailer = require('nodemailer');

const keyword = 'abcdefghtijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#';

function randomPasswordGenerator(){
    let password = '';
    for(let i=0; i<8; i++)
    {
        password+= keyword[Math.floor((Math.random()*64))];
    }
    // console.log(password);
    return password;
}

module.exports.mailTo = function(email,username) {
    // console.log(typeof email);
    const password = randomPasswordGenerator();
    const html=`<div style="margin-left:25%;margin-top:10%; width: 50%; align :center;">
    <p>
        <h2 style="color: rgb(60, 59, 59); font-family:'Courier';">  Team 9 <span style="font-size: 20px">Password Assistantce</span> </h2>
        
    </p>
    <hr>
    <p> username:<b>${username}</b></p>
    <p> password:<b>${password}</b></p>
    <p>Team 9 takes your account security very seriously. Team 9 will never email you and ask you to disclose or verify your password . If you receive a suspicious email with a link to update your account information, do not click on the link—instead, report the email to Team 9 for investigation.</p>
    <p>We hope to see you again soon.</p>
    <b>Team 9</b>
</div>`
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'ece4thyearproject@gmail.com', // generated ethereal user
                pass: 'wewillnevergiveup' // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Team 9" <ece4thyearproject@gmail.com>', // sender address
            to: email,
            subject: 'Forgot Password', // Subject line
            text: 'Forgot Password', // plain text body
            html: html // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
    return password;
}