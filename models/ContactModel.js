const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: { type: String, unique: true },
  phone: String,
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
