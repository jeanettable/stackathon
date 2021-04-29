const router = require('express').Router()
const Event = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const events = await Event.findAll({
        // explicitly select only attributes wanted for all events view
        attributes: [ 'id', 'title', 'callType', 'createdAt', 'description', 'jobLocation' ]
      })
      res.json(events)
    } catch (err) {
      next(err)
    }
  });