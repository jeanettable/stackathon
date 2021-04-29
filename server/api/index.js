const router = require('express').Router()
const { isLoggedIn, isOwner, isListOwner, isProduction } = require('../middleware');
module.exports = router

// main view for job-seekers is the event postings fetch, no protections necessary
router.use('/events', require('./events'));
// for editing job-seeker profile:
router.use('/users/edit/:userId', isLoggedIn, isOwner, require('./users'));

// lists and viewing all users is a production user accessible only piece of site
router.use('/users', isLoggedIn, isProduction, require('./users'));
// not sure how to deal with both production users and profile-owners being able to view profile
router.use('/users/:userId', isLoggedIn, require('./users'));
router.use('/lists', isLoggedIn, isProduction, isListOwner, require('./lists'));
router.use('/lists/:listId', isLoggedIn, isProduction, isListOwner, require('./lists'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
