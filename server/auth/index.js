const router = require('express').Router()
const { User } = require('../db')
module.exports = router

//POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})

//POST /auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    console.log('req.body>>> ', req.body);
    const user = await User.create(req.body)
    // user not able to be created right now...not printing ln 20
    console.log('user>>> ', user);
    res.send( {token: await user.generateToken()} )
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists.')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
