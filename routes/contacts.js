const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactModel');
const { authGuard } = require('../middlewares/authMiddleware');

router.use(authGuard);

// GET /api/contacts?search=abc
router.get('/contacts', async (req, res) => {
  const { search } = req.query;
  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ]
      }
    : {};

  const contacts = await Contact.find(query).limit(100);
  res.json(contacts);
});

module.exports = router;
