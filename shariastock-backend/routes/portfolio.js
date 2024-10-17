const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/portfolio
// @desc    Get user's portfolio
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Here you would typically fetch the user's portfolio from your database
    // This is a placeholder response
    res.json([
      { id: 1, name: 'AAPL', quantity: 10, purchasePrice: 150 },
      { id: 2, name: 'GOOGL', quantity: 5, purchasePrice: 2500 },
    ]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;