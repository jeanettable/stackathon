const router = require('express').Router()
const { User, Detail } = require('../db')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [ 'id', 'email' ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

// GET /api/users/:userId       // for profile viewing
router.get('/:userId', async (req, res, next) => {
  try {
      const profileDetails = await Detail.findOne({
          where: {
              userId: req.params.userId,
          }
      });
      res.json(profileDetails);
  } catch (err)    {
      next(err)
  }
});
