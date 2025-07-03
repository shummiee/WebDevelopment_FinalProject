// js/setAdmin.cjs
const mongoose = require('mongoose');
const User = require('../backend/models/user');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { dbName: 'BadThrifts' })
  .then(async () => {
    const email = 'badthrifts.admin@gmail.com';
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found');
      process.exit();
    }
    user.isAdmin = true;
    await user.save();
    console.log('✅ Admin rights granted to:', email);
    process.exit();
  })
  .catch(err => console.error('❌ MongoDB error:', err));
