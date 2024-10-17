const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/stocks
// @desc    Get available stocks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Here you would typically fetch available stocks from your database or an external API
    // This is a placeholder response
    res.json([
      { id: 1, name: 'AAPL', currentPrice: 150 },
      { id: 2, name: 'GOOGL', currentPrice: 2500 },
      { id: 3, name: 'MSFT', currentPrice: 300 },
    ]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;