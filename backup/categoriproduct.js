models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);



scripts/seed.js


const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const seedProducts = async () => {
  const products = [
    { name: 'Laptop', price: 1000, category: 'Electronics', stock: 10 },
    { name: 'Headphones', price: 200, category: 'Electronics', stock: 20 },
    { name: 'Chair', price: 150, category: 'Furniture', stock: 15 },
    { name: 'Table', price: 300, category: 'Furniture', stock: 5 },
    { name: 'T-shirt', price: 20, category: 'Clothing', stock: 50 },
    { name: 'Jeans', price: 40, category: 'Clothing', stock: 30 },
  ];

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.deleteMany(); // Clear existing data
    await Product.insertMany(products);

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();



Run the seeding script:
node scripts/seed.js



controllers/productController.js

const Product = require('../models/Product');

// Get products by category
const getProductsByCategory = async (req, res, next) => {
  const { category } = req.query;

  try {
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Find products matching the category
    const products = await Product.find({ category });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    next(error); // Pass errors to the error middleware
  }
};

// Get all unique categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProductsByCategory, getAllCategories };




routes/productRoutes.js
const express = require('express');
const { getProductsByCategory, getAllCategories } = require('../controllers/productController');

const router = express.Router();

// Route to get products by category
router.get('/category', getProductsByCategory);

// Route to get all categories
router.get('/categories', getAllCategories);

module.exports = router;




server.js



const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));




 Test the Category-Wise Endpoints
1. Get Products by Category
Request 
GET http://localhost:5000/api/products/category?category=Electronics

GET http://localhost:5000/api/products/categories


Pagination for Categories
const getProductsByCategory = async (req, res, next) => {
  const { category, page = 1, limit = 10 } = req.query;

  try {
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const skip = (page - 1) * limit;

    const products = await Product.find({ category })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments({ category });

    res.status(200).json({
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};











Enhanced Controller with Sorting and Pagination

controllers/productController.js

const Product = require('../models/Product');

// Get products by category with pagination and sorting
const getProductsByCategory = async (req, res, next) => {
  const { category, page = 1, limit = 10, sortBy = 'price', order = 'asc' } = req.query;

  try {
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Pagination: Calculate the skip based on the page number and limit
    const skip = (page - 1) * limit;

    // Sort: Dynamic sorting based on the query parameter
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortCriteria = {};
    sortCriteria[sortBy] = sortOrder;

    const products = await Product.find({ category })
      .skip(skip)
      .limit(Number(limit))
      .sort(sortCriteria); // Apply sorting based on sortBy and order

    const total = await Product.countDocuments({ category });

    res.status(200).json({
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error); // Pass errors to the error middleware
  }
};

// Get all categories with pagination and sorting
const getAllCategories = async (req, res, next) => {
  const { page = 1, limit = 10, sortBy = 'category', order = 'asc' } = req.query;

  try {
    // Pagination: Calculate the skip based on the page number and limit
    const skip = (page - 1) * limit;

    // Sort: Dynamic sorting based on the query parameter
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortCriteria = {};
    sortCriteria[sortBy] = sortOrder;

    // Get distinct categories with pagination and sorting
    const categories = await Product.distinct('category')
      .skip(skip)
      .limit(Number(limit))
      .sort(sortCriteria); // Apply sorting based on sortBy and order

    const total = await Product.countDocuments();

    res.status(200).json({
      categories,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProductsByCategory, getAllCategories };


routes/productRoutes.js
const express = require('express');
const { getProductsByCategory, getAllCategories } = require('../controllers/productController');

const router = express.Router();

// Route to get products by category with sorting and pagination
router.get('/category', getProductsByCategory);

// Route to get all categories with sorting and pagination
router.get('/categories', getAllCategories);

module.exports = router;



Example API Requests
GET http://localhost:5000/api/products/category?category=Electronics&page=1&limit=5&sortBy=price&order=desc






middleware/errorHandler.js


const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;


Get Products by Category with Sorting and Pagination:

GET http://localhost:5000/api/products/category?category=Furniture&page=2&limit=2&sortBy=name&order=asc

Get All Categories with Sorting and Pagination

GET http://localhost:5000/api/products/categories?page=1&limit=5&sortBy=category&order=desc










