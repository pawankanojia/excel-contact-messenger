const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  to: String,
  subject: String,
  message: String,
  status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
  error: String,
}, { timestamps: true });

module.exports = mongoose.model('EmailLog', emailLogSchema);
