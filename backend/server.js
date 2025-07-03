// backend/server.js
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const open = require('open').default;
const path = require('path');
const userRoutes = require('./routes/user');

const productRoutes = require('./routes/products');

require('dotenv').config();
console.log('__dirname:', __dirname);
console.log('MONGO_URI:', process.env.MONGO_URI);

const adminRoutes = require('./routes/admin');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(session({
  secret: 'supersecretkey', // change this to something secure
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // use true only if using HTTPS
}));

app.use(express.json());
app.use('/api/users', userRoutes);

app.use('/products', productRoutes);

app.use('/admin', adminRoutes);


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

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/cart', (req, res) => {
  res.render('cart');
});

// backend/server.js
app.get('/main', (req, res) => {
  const user = {
    firstName: req.session.username || null,
    isAdmin: req.session.isAdmin || false
  };
  res.render('main', { user });
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/main`);
  open(`http://localhost:${PORT}/main`);
});
