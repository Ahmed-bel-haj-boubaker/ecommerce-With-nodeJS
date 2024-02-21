const path = require('path');

module.exports = {
  entry: './server.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js' // Output bundle filename
  },
  module: {
    rules: [
      // Add rules for processing different file types here (e.g., JavaScript, CSS, etc.)
    ]
  }
};
