const mongoose = require('mongoose')
const dotenv = require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.URI);
console.log('Connection successful.')

// Close Mongoose connection on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
  });
});

const dbConnection = mongoose.connection;

// module.exports = { connectDB };
module.exports = dbConnection;
