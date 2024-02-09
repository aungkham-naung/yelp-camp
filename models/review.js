//creating a database for comments or reviews left for each campground
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating a model for the database (Reviewing Campground)
const reviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Review', reviewSchema)