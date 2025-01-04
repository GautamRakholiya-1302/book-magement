const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Global middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error-handling middleware
app.use(errorHandler); // Must come after all other middleware and routes

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));


// Here is used middlware updated code 

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Global middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error-handling middleware
app.use(errorHandler); // Must come after all other middleware and routes

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));

//==========================================
// Integrate the Search Route into the App

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

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


//GET http://localhost:5000/api/users/search?query=John

//[
//   {
//     "_id": "63c0e99f1b1a77f8dcd3e45b",
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "age": 30,
//     "createdAt": "2023-01-01T00:00:00.000Z"
//   }
// ]






//===========================================




// PUT http://localhost:5000/api/users/123
// Content-Type: application/json

// {
//   "email": "john.doe@example.com"
// }
