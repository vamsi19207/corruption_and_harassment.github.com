const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send_email', (req, res) => {
    const { name, email, type, message } = req.body;

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vamseedharreddy1209@gmail.com', // Replace with your Gmail email address
            pass: 'Vamsi@2003' // Replace with your Gmail password
        }
    });

    // Setup email data
    let mailOptions = {
        from: email,
        to: 'vamseedharreddy1209@gmail.com,vamsibhumireddy4@gmail.com', // Replace with the recipient's email address
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nType: ${type}\nMessage:\n${message}`
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Failed to send email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully!');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
