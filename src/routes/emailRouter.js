import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();
router.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    auth: {
        user: 't.filiniuk @gmail.com',
        pass: 'ghblehjrfuck66'
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
      from: '"Nodemailer Contact" <t.filiniuk@gmail.com>',
      to: 't.filiniuk@gmail.com',
      subject: 'Node Contact Request',
      text: 'Hello world?',
      html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      console.log('Message %s sent: %s', info.messageId, info.response);

      res.render('contact', {msg:'Email has been sent'});
      res.writeHead(301);
      res.end();
  });
  });

export default router;
