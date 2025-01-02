const User = require('../models/User');
const Book = require('../models/Book');

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { address } = req.body;
    req.user.address = address || req.user.address;
    await req.user.save();
    res.status(200).json({ message: 'Profile updated successfully', user: req.user });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book || book.copiesAvailable === 0) {
      return res.status(400).json({ error: 'Book not available' });
    }

    book.copiesAvailable -= 1;
    req.user.borrowedBooks.push(book._id);
    await book.save();
    await req.user.save();

    res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    book.copiesAvailable += 1;
    req.user.borrowedBooks = req.user.borrowedBooks.filter(
      (id) => id.toString() !== bookId.toString()
    );
    await book.save();
    await req.user.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

