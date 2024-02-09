const express = require('express');
const router = express.Router({ mergeParams: true });


const { isLoggedIn, validateReview, isReviewAuthor } = require('../utils/middleware.js')
const catchAsync = require('../utils/catchAsync') //should be added to all async


const Campground = require('../models/campground')
const Review = require('../models/review.js')

const reviews = require('../controllers/reviews.js')

// Adding Review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;

