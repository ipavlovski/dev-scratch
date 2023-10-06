// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const msg = {
  to: '', // recipient email!
  from: '', // sender email!
  subject: 'Hello world from sendgrid',
  text: 'This is plaintext',
  html: '<strong>This is boldified</strong>, this is regular text.',
}

sgMail.send(msg).then(() => {
  console.log('Email sent')
}).catch((error) => {
  console.error(error)
})
