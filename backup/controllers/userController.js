// Create a function to update user details
const User = require('../models/User');

// Update user details
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true, runValidators: true } // Return updated doc and validate inputs
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

module.exports = { updateUser };



// This is using error handling middlware 

const User = require('../models/User');

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    // Validate request body
    if (!name || !email) {
      res.status(400);
      throw new Error('Name and email are required'); // Pass error to the error middleware
    }

    // Attempt to update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error('User not found'); // Pass error to the error middleware
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error); // Pass unexpected errors to the error middleware
  }
};

module.exports = { updateUser };
