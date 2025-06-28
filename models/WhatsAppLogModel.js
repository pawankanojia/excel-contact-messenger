const mongoose = require('mongoose');

const whatsappLogSchema = new mongoose.Schema({
  phone: String,
  message: String,
  status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
  error: String,
}, { timestamps: true });

module.exports = mongoose.model('WhatsAppLog', whatsappLogSchema);
