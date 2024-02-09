const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds.js');
const { isLoggedIn, isAuthor, validateCampground } = require('../utils/middleware.js')
const catchAsync = require('../utils/catchAsync') //should be added to all async
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


router.route('/')
  .get(catchAsync(campgrounds.index)) // Getting to list all the available data
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground)) // After the input data, we need to post it

// Making new campground (basically adding our own data)
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
  .get(isLoggedIn, catchAsync(campgrounds.showCampground)) // Getting data by ID
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.editCampground))  // After Editing, you need to update it
  .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground))  // Deleting data


// Editing Specific Data
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router;