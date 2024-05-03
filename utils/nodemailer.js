const nodemailer = require("nodemailer");

const dbEmail = process.env.DB_EMAIL;
const dbPass = process.env.DB_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, 
  auth: {
    user: {dbEmail},
    pass: {dbPass},
  },
});

module.exports = transporter
