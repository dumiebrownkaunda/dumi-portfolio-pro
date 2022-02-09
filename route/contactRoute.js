const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/contact", (req, res) => {
  let data = req.body;

  if (
    data.name.length === 0 ||
    data.email.length === 0 ||
    data.message.length === 0
  ) {
    return res.json({ msg: "Please fill all the fields" });
  }
  let smtpTransporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "brownkaunda@gmail.com",
      pass: "Humblebeast13.",
    },
  });

  let mailOptions = {
    from: data.email,
    to: "brownkaunda13@gmail.com",
    subject: `message from ${data.name}`,
    html: `
          <li>Email: ${data.email}</li></ul>
          <h3>Message</h3>
          <p>${data.message}</p>`,
  };

  smtpTransporter.sendMail(mailOptions, (error) => {
    try {
      if (error)
        return res.status(400).json({ msg: "Please fill all the fields" });
      res.status(200).json({ msg: "Thank for contacting Dumisani B Kaunda" });
    } catch (error) {
      if (error) return res.status(500).json({ msg: "Thre is a server error" });
    }
  });
});

module.exports = router;
