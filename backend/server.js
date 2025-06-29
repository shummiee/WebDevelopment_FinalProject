const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const open = require('open').default; 
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
const PORT = 3000;

mongoose.connect(process.env.DB_CONNECTION, {
  dbName: 'BadThrifts',
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB error:', err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRoutes);



app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'main.html'));
});

app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});
