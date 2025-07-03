const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const open = require('open').default;
const path = require('path');
const session = require('express-session');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

require('dotenv').config();
console.log('__dirname:', __dirname);
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();

// ✅ Middleware: CORS & JSON
app.use(cors());
app.use(express.json());

// ✅ Sessions: always before routes!
app.use(session({
  secret: 'YOUR_SECRET_KEY',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true only with HTTPS
}));

// ✅ Routes: API + Admin
app.use('/api/users', userRoutes);
app.use('/admin', adminRoutes);

// ✅ Static files & EJS views
app.use(express.static(path.join(__dirname, '..')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, { dbName: 'BadThrifts' })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Page routes — pass userId except login
app.get('/main', (req, res) => {
  console.log("✅ /main route hit!");
  res.render('main', { userId: req.session.userId });
});

app.get('/products', (req, res) => {
  console.log("✅ /products route hit!");
  res.render('products', { userId: req.session.userId });
});

app.get('/viewProducts', (req, res) => {
  console.log("✅ /viewProducts route hit!");
  res.render('viewProducts', { userId: req.session.userId });
});

app.get('/profile', (req, res) => {
  console.log("✅ /profile route hit!");
  res.render('profile', { userId: req.session.userId });
});

app.get('/cart', (req, res) => {
  console.log("✅ /cart route hit!");
  res.render('cart', { userId: req.session.userId });
});

// ✅ Login: DO NOT pass userId
app.get('/auth/login', (req, res) => {
  console.log("✅ /auth/login route hit!");
  res.render('auth/login'); // NO userId!
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/main`);
  open(`http://localhost:${PORT}/main`);
});
