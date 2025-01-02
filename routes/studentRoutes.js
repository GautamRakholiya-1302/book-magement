const express = require('express');
const { updateProfile, borrowBook, returnBook } = require('../controllers/studentController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.put('/profile', authenticate, updateProfile);
router.post('/borrow', authenticate, borrowBook);
router.post('/return', authenticate, returnBook);

module.exports = router;
