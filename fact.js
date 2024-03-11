const express = require('express');
const axios = require('axios');
const app = express();

// Default root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

// Example path parameter
app.get('/name/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello ${name}` });
});

// Random fact endpoint
app.get('/randomfact', async (req, res) => {
  try {
    const response = await axios.get('https://useless-facts.sameerkumar.website/api/random');
    const randomFact = response.data.text;
    res.json({ fact: randomFact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random fact' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
