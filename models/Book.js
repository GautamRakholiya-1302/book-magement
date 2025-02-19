const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  copiesAvailable: { type: Number, required: true },
  totalCopies: { type: Number, required: true }
});

module.exports = mongoose.model('Book', bookSchema);
