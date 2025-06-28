const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/auth/register', register);  // Optional: remove later in production
router.post('/auth/login', login);

module.exports = router;
