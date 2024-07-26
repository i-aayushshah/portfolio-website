// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Use the contact API
const contactRouter = require('./api/contact');
app.use('/api/contact', contactRouter);

// Serve the index.html file at the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
