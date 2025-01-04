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
