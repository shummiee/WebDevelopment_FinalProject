const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
//const productRoutes = require('./routes/products'); 
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/thriftstore')
  .then(() => console.log('Connected to MongoDB thriftstore'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // To handle form data
app.use(express.json());

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, '..')));

// Routes
//app.use('/api/products', productRoutes);   // Product API
app.use('/api/users', userRoutes);         // User API (includes POST /register)

// Page route to show register form
app.get('/register', (req, res) => {
  res.render('auth/register');  // Looks in views/auth/register.ejs
});

// Test route
// Serve main.html as homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'main.html'));
});


// Start the server
const { exec } = require('child_process');

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  exec(`start http://localhost:${PORT}`); // Opens browser on Windows
});

