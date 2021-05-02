const router = require('express').Router()
const { isLoggedIn, isOwner, isListOwner, isProduction } = require('../middleware');
module.exports = router

// main view for job-seekers is the event postings fetch, no protections necessary
router.use('/events', require('./events'));
// for editing job-seeker profile:
// router.use('/edit-profile', isLoggedIn, isOwner, require('./...'));

// lists and viewing all users is a production user accessible only piece of site
// not sure how to deal with both production users and profile-owners being able to view profile
router.use('/users', isLoggedIn, isProduction, require('./users'));
router.use('/users/:userId', isLoggedIn, require('./users'));

router.use('/users/:userId/edit', isLoggedIn, isOwner, require('./editProfile'));
router.use('/users/:userId/edit/image-upload', isLoggedIn, isOwner, require('./fileUpload'));
router.use('/users/:userId/edit/pdf-upload', isLoggedIn, isOwner, require('./fileUpload'));

// router.use('/lists', isLoggedIn, isProduction, isListOwner, require('./lists'));

router.use( (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
