const axios = require('axios');
const qs = require('qs');
const WhatsAppLog = require('../models/WhatsAppLogModel');

exports.sendBulkWhatsApp = async (req, res) => {
  const { contacts, messageTemplate } = req.body;

  if (!contacts || !messageTemplate) {
    return res.status(400).json({ message: 'Missing contacts or messageTemplate' });
  }

  const results = [];

  for (const contact of contacts) {
    const personalizedText = messageTemplate.replace(/\[Name\]/g, contact.name || '');
    const messagePayload = JSON.stringify({
      type: 'text',
      text: personalizedText
    });

    const data = qs.stringify({
      channel: 'whatsapp',
      source: process.env.GUPSHUP_SOURCE,
      destination: contact.phone,
      message: messagePayload,
      'src.name': 'naayadev'
    });

    try {
      await axios.post(process.env.GUPSHUP_BASE_URL, data, {
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencoded',
          'apikey': process.env.APIKEY
        }
      });

      await WhatsAppLog.create({
        phone: contact.phone,
        message: personalizedText,
        status: 'sent'
      });

      results.push({ phone: contact.phone, status: 'sent' });

    } catch (err) {
      await WhatsAppLog.create({
        phone: contact.phone,
        message: personalizedText,
        status: 'failed',
        error: err.response?.data || err.message
      });

      results.push({ phone: contact.phone, status: 'failed', error: err.message });
    }
  }

  return res.status(200).json({ message: 'WhatsApp messages processed', results });
};
