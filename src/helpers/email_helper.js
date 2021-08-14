const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ollie.leuschke@ethereal.email",
    pass: "eR8YEvcrnpywSq8xvF",
  },
});

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      let result = await transporter.sendMail(info);

      console.log("Message sent: %s", result.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      resolve(result);
    } catch (error) {
      console.log(error);
    }
  });
};

const emailProcessor = ({ email, pin, type, verifyLink = "" }) => {
  let info = "";
  switch (type) {
    case "request-new-password":
      info = {
        from: '"Inspection Co." <ollie.leuschke@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Inspection Co. Password Reset Pin", // Subject line
        text: "Your reset pin for Inspection Co. is " + pin + "!", // plain text body
        html: `Your reset pin for Inspection Co. is <b>${pin}</b>!`, // html body
      };

      send(info);
      break;
    case "update-password-success":
      info = {
        from: '"Inspection Co." <ollie.leuschke@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Inspection Co. Password Updated", // Subject line
        text: "You password has been updated!", // plain text body
        html: "You password has been updated!", // html body
      };
    case "user-confirmation":
      info = {
        from: '"Inspection Co." <ollie.leuschke@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Inspection Co. Verification", // Subject line
        text: "Click the link to verify you Inspection Co. account!", // plain text body
        html: `<p>Click the link to verify you Inspection Co. account!</p>
        <p>${verifyLink}</p>`, // html body
      };

      send(info);

      break;

    default:
      break;
  }
};

module.exports = {
  emailProcessor,
};
