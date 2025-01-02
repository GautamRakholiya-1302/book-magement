const User = require('../models/User');
const Book = require('../models/Book');

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, category, totalCopies } = req.body;
    const book = new Book({ title, author, category, totalCopies, copiesAvailable: totalCopies });
    await book.save();
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// View all users
exports.viewAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

