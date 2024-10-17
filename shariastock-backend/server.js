const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/stocks', require('./routes/stocks'));

// Basic route for testing
app.get('/', (req, res) => res.send('ShariaStock API Running'));

// Set port
const PORT = process.env.PORT || 5002;

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Log database connection
mongoose.connection.once('open', () => {
  console.log(`MongoDB connected to database: ${mongoose.connection.name}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;