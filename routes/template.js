const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/templateController');
const { authGuard } = require('../middlewares/authMiddleware');

router.use(authGuard); // Protect all template routes

router.post('/templates', ctrl.createTemplate);
router.get('/templates', ctrl.getTemplates);
router.put('/templates/:id', ctrl.updateTemplate);
router.delete('/templates/:id', ctrl.deleteTemplate);

module.exports = router;
