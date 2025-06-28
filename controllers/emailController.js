    const transporter = require("../utils/mailer");
    const EmailLog = require("../models/EmailLogModel");

    exports.sendBulkEmail = async (req, res) => {
    const { contacts, subject, messageTemplate } = req.body;

    if (!contacts || !subject || !messageTemplate) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const results = [];

    for (const contact of contacts) {
        const personalizedMessage = messageTemplate
        .replace(/\[Name\]/g, contact.name)
        .replace(/\[Email\]/g, contact.email);

        const mailOptions = {
        from: `"Excel Contact Messenger" <${process.env.EMAIL_USER}>`,
        to: contact.email,
        subject: subject,
        html: `<p>${personalizedMessage}</p>`,
        };

        try {
        await transporter.sendMail(mailOptions);
        await EmailLog.create({
            to: contact.email,
            subject,
            message: personalizedMessage,
            status: "sent",
        });
        results.push({ email: contact.email, status: "sent" });
        } catch (error) {
        console.error(`Failed to send to ${contact.email}`, error);
        await EmailLog.create({
            to: contact.email,
            subject,
            message: personalizedMessage,
            status: "failed",
            error: error.message,
        });
        results.push({
            email: contact.email,
            status: "failed",
            error: error.message,
        });
        }
    }

    return res.status(200).json({ message: "Emails processed", results });
    };
