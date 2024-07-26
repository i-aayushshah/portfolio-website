const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Contact API endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {

    await transporter.sendMail({
      from: '"Aayush Shah" <aayushshah983@gmail.com>',
      replyTo: `aayushshah714@gmail.com, ${email}`, // Ensure replies go to a different email
      to: email,
      bcc: 'aayushshah714@gmail.com', // BCC recipient so it's not shown to the main recipient
      subject: `Thank You for Reaching Out - ${subject}`,
      text: `Dear ${name},\n\nThank you for getting in touch with me. I have received your message regarding "${subject}". Will get back to you shortly.\n\nBest regards,\nAayush Shah`, // Plain text version
      html: `
        <div style="font-family: Georgia,serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

            <div style="background-color:rgb(60,60,60);color:rgb(255,255,255);padding:20px;text-align:center;border-radius: 10px 10px 0 0;">
              <img src="https://www.aayushshah0425.com.np/assets/images/logo.png" alt="Aayush Shah Logo" style="width:100px;">
            </div>

            <h3 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; text-align: center;">Thank You for Reaching Out</h3>
            <p style="color: #555;">Dear <strong>${name}</strong>,</p>
            <p style="color: #555;">Thank you for getting in touch with me. I have received your message regarding <strong>"${subject}"</strong>. I will review your message and get back to you shortly.</p>
            <p style="color: #555;">Here is a summary of your message:</p>
            <div style="background-color: #f0f0f0; color: #555555; padding: 15px; border-radius: 5px;">
              <p style="color: #555;"><strong style="color: #4CAF50;">Name:</strong> ${name}</p>
              <p style="color: #555;"><strong style="color: #4CAF50;">Email:</strong> ${email}</p>
              <p style="color: #555;"><strong style="color: #4CAF50;">Subject:</strong> ${subject}</p>
              <p style="color: #555;"><strong style="color: #4CAF50;">Message:</strong></p>
              <p style="color: #555; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #555; text-align: left; margin-top: 20px;">Best regards,<br><b>Aayush Shah</b></p>
            <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
            <p style="color: #555; text-align: center; margin-top: 20px;">Connect with me at:</p>
            <table style="margin: auto;">
              <tr>
                <td style="text-align: center;">
                  <a href="https://www.facebook.com/i.aayushhh" style="text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="Facebook" style="width: 30px; margin-right: 8px;">
                  </a>
                </td>
                <td style="text-align: center;">
                  <a href="https://wa.me/9779816835214?text=Hello%2C%20I%20would%20like%20to%20contact%20you" style="text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=7OeRNqg6S7Vf&format=png&color=000000" alt="Facebook" style="width: 30px; margin-right: 8px;">
                  </a>
                </td>
                <td style="text-align: center;">
                  <a href="https://www.instagram.com/i.aayushhh_/" style="text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000" alt="Instagram" style="width: 30px; margin-right: 8px;">
                  </a>
                </td>
                <td style="text-align: center;">
                  <a href="https://www.linkedin.com/in/aayush-shah-aabaa5282/" style="text-decoration: none;">
                    <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" alt="LinkedIn" style="width: 30px;">
                  </a>
                </td>
              </tr>
            </table>

            <div style="margin-top:20px; text-align: center;">
              <p><a href="https://aayushshah0425.com.np/" style="color: rgb(26, 115, 232); text-decoration-line: none; font-size: 16px;" target="_blank">
                <img src="https://ci3.googleusercontent.com/meips/ADKq_NZ3H8JjrKwl5-fpsr6QQBKXMM54TQhJCcNO-fbXw7WZOr1xiYsuq3_cXZZDumNlPQKVLwTUtrUo2Urzf0IuuRQ3rsnGCChhgTbWZQ=s0-d-e1-ft#https://img.icons8.com/ios-filled/50/000000/globe.png" alt="Website" style="width:20px;vertical-align:middle;margin-right:8px" class="gmail_canned_response_image">
              Visit my website
              </a></p>
            </div>
          </div>
        </div>
      `, // Enhanced HTML version with social media icons at the bottom
    });


// Email to yourself
await transporter.sendMail({
  from: '"Aayush Shah" <aayushshah983@gmail.com>',
  to: 'aayushshah714@gmail.com',
  subject: `Contact Form Submission - ${subject}`,
  text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text version
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Contact Form Submission</h2>
        <p style="color: #555;"><strong style="color: #4CAF50;">Name:</strong> ${name}</p>
        <p style="color: #555;"><strong style="color: #4CAF50;">Email:</strong> ${email}</p>
        <p style="color: #555;"><strong style="color: #4CAF50;">Subject:</strong> ${subject}</p>
        <p style="color: #555;"><strong style="color: #4CAF50;">Message:</strong></p>
        <p style="color: #555; white-space: pre-wrap;">${message}</p>
      </div>
    </div>
  `, // Enhanced HTML version with more styling
});

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error sending email: " + error.message });
  }
});

// Serve the index.html file at the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
