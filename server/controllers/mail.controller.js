const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');

const mailgunOptions = {
  auth: {
    api_key: 'f3874dd287c03ea2550b838b40bf9e3c-0920befd-9b39c502',
    domain: 'https://app.mailgun.com/app/sending/domains/sandbox5eddb6d7aee740d3b5fbd37212c8c3bb.mailgun.org/messages',
  },
};

const transporter = nodemailer.createTransport(mailgunTransport(mailgunOptions), {
    debug: true,
    logger: true,
  });
  
const sendMessage = (req, res) => {
  const { name, email, phone, currentAddress, interests, requirements, message, landlordEmail } = req.body;

  const mailOptions = {
    from: email, 
    to: landlordEmail,
    subject: `Message from ${name} regarding the property`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Current Address: ${currentAddress}
      Interests: ${interests}
      Requirements: ${requirements}
      
      Message: 
      ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).send('Email sent successfully');
  });
};

module.exports = { sendMessage };
