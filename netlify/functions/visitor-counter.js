// Netlify Function for Visitor Counter
const faunadb = require('faunadb');

// Using environment variable for Fauna DB (or simple counter in Netlify Blobs)
// For now, we'll use a simple approach with Netlify's key-value store

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // For simplicity, we'll store count in a file
  const { readFileSync, writeFileSync, existsSync } = require('fs');
  const path = require('path');
  const countFile = path.join('/tmp', 'visitor-count.txt');

  try {
    let count = 0;

    // Read current count
    if (existsSync(countFile)) {
      count = parseInt(readFileSync(countFile, 'utf8')) || 0;
    }

    if (event.httpMethod === 'POST') {
      // Increment count
      count++;
      writeFileSync(countFile, count.toString());
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ value: count, action: 'incremented' })
      };
    }

    // GET - return current count
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ value: count })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message, value: 0 })
    };
  }
};
