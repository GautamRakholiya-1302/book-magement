const express = require('express');
const { updateUser } = require('../controllers/userController');
const router = express.Router();

// PUT /api/users/:id
router.put('/:id', updateUser);

module.exports = router;


// PUT http://localhost:5000/api/users/:id
// {
//   "name": "John Doe",
//   "email": "john.doe@example.com",
//   "age": 30
// }

const express = require('express');
const { updateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// PUT /api/users/:id (protected route)
router.put('/:id', authMiddleware, updateUser);

module.exports = router;


//=================================
//Create a Route for Searching
const express = require('express');
const { searchUsers } = require('../controllers/userController');

const router = express.Router();

// Search route: GET /api/users/search
router.get('/search', searchUsers);

module.exports = router;


//===================================
