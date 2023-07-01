const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/data/:page', async (req, res) => {
  try {
    const page = req.params.page;
    const response = await axios.get(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`);
    const data = response.data;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Set the allowed origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Set the allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Set the allowed headers
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
