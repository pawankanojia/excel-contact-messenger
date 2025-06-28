const express = require('express');
const router = express.Router();
const { sendBulkEmail } = require('../controllers/emailController');
const { authGuard } = require('../middlewares/authMiddleware');

router.post('/send-emails',authGuard, sendBulkEmail);

module.exports = router;
