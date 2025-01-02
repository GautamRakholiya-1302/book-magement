const express = require('express');
const {
  addBook,
  updateBook,
  deleteBook,
  viewBorrowedBooks,
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/adminController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/books', authenticate, authorize(['admin']), addBook);
router.put('/books/:bookId', authenticate, authorize(['admin']), updateBook);
router.delete('/books/:bookId', authenticate, authorize(['admin']), deleteBook);
router.get('/borrowed-books', authenticate, authorize(['admin']), viewBorrowedBooks);

router.post('/users', authenticate, authorize(['admin']), addUser);
router.put('/users/:userId', authenticate, authorize(['admin']), updateUser);
router.delete('/users/:userId', authenticate, authorize(['admin']), deleteUser);

module.exports = router;
