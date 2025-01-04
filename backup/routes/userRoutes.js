const express = require('express');
const { updateUser } = require('../controllers/userController');
const router = express.Router();

// PUT /api/users/:id
router.put('/:id', updateUser);

module.exports = router;


PUT http://localhost:5000/api/users/:id

