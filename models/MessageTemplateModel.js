const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  type: { type: String, enum: ['email', 'whatsapp'], required: true },
  name: { type: String, required: true, unique: true },
  subject: String, // only for email
  body: String
}, { timestamps: true });

module.exports = mongoose.model('MessageTemplate', templateSchema);
