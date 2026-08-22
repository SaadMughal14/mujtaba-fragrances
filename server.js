import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import orderHandler from './api/order.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API route
app.all('/api/order', (req, res) => {
  orderHandler(req, res);
});

// Serve static files
app.use(express.static(__dirname));

// Fallback to index.html for root or unknown GET requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
