const server = require('./server'); // Import the server file

// Start the server
const PORT = 6000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
