const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.get('/search', authMiddleware, async (req, res) => {
  try {
    const { query } = req.query;
    const searchRegex = new RegExp(query, 'i');

    const users = await User.find({
      $and: [
        { _id: { $ne: req.userId } }, 
        {
          $or: [
            { username: searchRegex },
            { email: searchRegex }
          ]
        }
      ]
    }).select('-password -friendRequests');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users' });
  }
});


router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('friends', 'username email')
      .populate('friendRequests.from', 'username email');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router;
