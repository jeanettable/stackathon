const router = require('express').Router()
const { Event } = require('../db')
module.exports = router

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

  router.get('/:eventId', async (req, res, next) => {
    try {
      const event = await Event.findByPk(req.params.id);
      res.json(event);
    } catch (err) {
      next(err)
    }
  });