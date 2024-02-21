const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'server.js'), // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js' // Output bundle filename
  },
  resolve: {
    fallback: {
      fs: false, // or require.resolve("stream-browserify")
      http: false, // or require.resolve("stream-http")
      net: false, // or require.resolve("net-browserify")
      url: false, // or require.resolve("url/")
      buffer: false // or require.resolve("buffer/")
      // Add other core modules here as needed
    }
  },
  module: {
    rules: [
      // Add rules for processing different file types here (e.g., JavaScript, CSS, etc.)
    ]
  }
};
