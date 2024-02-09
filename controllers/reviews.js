const Campground = require('../models/campground')
const Review = require('../models/review.js')

module.exports.createReview = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id) //matching the id of the campgroud we created from the url
  const review = new Review(req.body.review) //getting the review a user left in the textarea
  review.author = req.user._id
  campground.reviews.push(review) //pushing the data that we get to our campgroud database 
  await review.save() //saving data in database
  await campground.save() //saving data in database
  req.flash('success', `You've created a new review`) //creating flash message for reviews
  res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
  // Deleting Reviews from Review database but the object id is still there in Campground database
  const { id, reviewId } = req.params
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
  await Review.findByIdAndDelete(req.params.reviewId)
  req.flash('success', `You've successfully deleted a review`)
  res.redirect(`/campgrounds/${id}`)
}