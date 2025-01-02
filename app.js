require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes'); // Admin-related routes
const studentRoutes = require('./routes/studentRoutes'); // Student-related routes

// Initialize Express App
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection String (Local MongoDB)
const MONGO_URI = 'mongodb://127.0.0.1:27017/library_management_system';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

// Routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/student', studentRoutes); // Student routes

// Root Route
app.get('/', (req, res) => {
  res.send('Library Management System API is running!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// npm install express mongoose dotenv jsonwebtoken bcrypt
//npm install express mongoose dotenv jsonwebtoken bcrypt morgan
//npm install --save-dev nodemon


// //
// "scripts": {
//   "start": "node app.js",
//   "dev": "nodemon app.js"
// }


//npm run dev


