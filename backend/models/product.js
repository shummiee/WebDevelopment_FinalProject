const mongoose = require('mongoose');

// Create schema based on your MongoDB Compass sample
const ProductSchema = new mongoose.Schema({
  Name: String,
  Gender: String,
  Category: String,
  Clothing: String,
  Size: String,
  Brand: String,
  Price: Int32,
  Stock_Quantity: Int32,

  
});

// IMPORTANT: 3rd argument 'test' forces Mongoose to use the 'test' collection
module.exports = mongoose.model('Product', ProductSchema, 'test');
