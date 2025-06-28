const express = require('express');
const router = express.Router();
const { sendBulkWhatsApp } = require('../controllers/whatsappController');
const { authGuard } = require('../middlewares/authMiddleware');

router.post('/send-whatsapp',authGuard,sendBulkWhatsApp);

module.exports = router;
