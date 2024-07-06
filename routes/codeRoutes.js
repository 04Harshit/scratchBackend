const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/authMiddleware');

router.post('/check', codeController.checkCode);
router.post('/', authenticateToken, authorizeAdmin, codeController.addCodes);

module.exports = router;