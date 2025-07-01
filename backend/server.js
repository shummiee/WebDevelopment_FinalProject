// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const open = require('open').default;
const path = require('path');
const userRoutes = require('./routes/user');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// Serve your CSS/JS/IMG etc from the project root
app.use(express.static(path.join(__dirname, '..')));

// Tell Express to look for EJS files one level up in /views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { dbName: 'BadThrifts' })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- Your page routes ---
app.get('/main', (req, res) => {
  res.render('main');
});

app.get('/products', (req, res) => {
  res.render('products');
});

app.get('/viewProducts', (req, res) => {
  res.render('viewProducts');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/main`);
  open(`http://localhost:${PORT}/main`);
});
