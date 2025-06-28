const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
}, { timestamps: true });

module.exports = mongoose.model('AdminUser', adminUserSchema);
