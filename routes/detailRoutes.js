const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detailController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, authorizeAdmin, detailController.getDetails);

module.exports = router;