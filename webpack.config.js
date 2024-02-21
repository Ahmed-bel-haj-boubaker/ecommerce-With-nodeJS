const path = require('path');

module.exports = {
  entry: './server.js', // Entry point of your application
  mode:'development',
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'main.js' // Output bundle filename
  },
  resolve: {
    fallback: {
      "fs": false,
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "net": false,
      "querystring": require.resolve("querystring-es3"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "zlib": require.resolve("browserify-zlib"),
      "os": require.resolve("os-browserify/browser"),
      "assert": require.resolve("assert/")

    }
  },
  module: {
    rules: [
      // Add rules for processing different file types here (e.g., JavaScript, CSS, etc.)
    ]
  }
};
