const router = require('express').Router()
const { Event } = require('../db')
module.exports = router

// GET api/events
router.get('/', async (req, res, next) => {
    try {
      const events = await Event.findAll({
        // explicitly select only attributes wanted for all events view
        attributes: [ 'id', 'title', 'callType', 'createdAt', 'jobLocation' ]
      })
      res.json(events)
    } catch (err) {
      next(err)
    }
  });

  // GET api/events/:eventId
  router.get('/:eventId', async (req, res, next) => {
    try {
      const event = await Event.findByPk(req.params.eventId);
      res.json(event);
    } catch (err) {
      next(err)
    }
  });