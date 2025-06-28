const express = require('express');
const router = express.Router();
const { authGuard } = require('../middlewares/authMiddleware');
const EmailLog = require('../models/EmailLogModel');
const WhatsAppLog = require('../models/WhatsAppLogModel');

router.use(authGuard);

// GET /api/logs/email
router.get('/logs/email', async (req, res) => {
  const logs = await EmailLog.find().sort({ createdAt: -1 }).limit(100);
  res.json(logs);
});

// GET /api/logs/whatsapp
router.get('/logs/whatsapp', async (req, res) => {
  const logs = await WhatsAppLog.find().sort({ createdAt: -1 }).limit(100);
  res.json(logs);
});

module.exports = router;
