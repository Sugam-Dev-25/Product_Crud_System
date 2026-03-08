const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
      type: String,
      enum: ["men", "women", "kids"]
    },

    size: {
      type: String,
      enum: ["S", "M", "L", "XL"]
    },

    color: {
      type: String,
      enum: ["red", "blue", "green", "black", "white"]
    },

    stock: {
      type: Number,
      required: true
  },
},
{ timestamps: true }

);

module.exports = mongoose.model('Product', ProductSchema);