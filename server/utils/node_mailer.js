'use strict';
const nodemailer = require('nodemailer');
const constants = require('./constants');

const { EMAIL_ERROR_DB_CONNECT, SERVER_EXCEPTION } = constants;

const client = async data => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `Ikigai Payment App 👻 ${process.env.SMTP_EMAIL_FROM}`,
    to: data.to,
    subject: data.subject || 'Hello ✔',
    html: data.html || '<b>Hello world?</b>',
  });

  console.log('Message sent: %s', info.messageId);
};

const buildEmail = data => {
  let to = process.env.SMTP_EMAIL_RECEIPIENTS;
  switch (data.domain) {
    case EMAIL_ERROR_DB_CONNECT:
      return {
        subject: 'An Error occured while connecting to Database',
        to,
        html: `<div> 
                <p> An error occured while connecting to DB. See error below</p>
                <p> ${data.additionalInfo} </p>
             </div>`,
      };
    case SERVER_EXCEPTION:
      return {
        subject: 'An Error occured while starting server',
        to,
        html: `<div> 
                  <p> An error occured while startig APIs. See error below</p>
                  <p> ${data.additionalInfo} </p>
               </div>`,
      };
    default:
      return {
        subject: 'We just decided to send you an email cause we can 👻',
        to,
      };
  }
};

const sendEmail = async data => {
  try {
    await client(buildEmail(data));
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
