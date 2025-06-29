const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  Name: String,
  Gender: String,
  Category: String,
  Clothing: String,
  Size: String,
  Brand: String,
  Price: Number,
  Stock_Quantity: Number,

  
});

module.exports = mongoose.model('Product', ProductSchema, 'test');
