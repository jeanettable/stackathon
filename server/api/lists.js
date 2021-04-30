const router = require('express').Router( {mergeParams: true} )
const { List, listEntry } = require('../db')
module.exports = router

//ONLY USERS RETRIEVING LISTS SHOULD BE PRODUCTION LEVEL

// production user would want to see all of their lists
router.get('/', async (req, res, next) => {
    try {
            const lists = await List.findAll({
                where: { ownerId: req.params.userId }
              });
              res.json(lists);
    } catch (err) {
      next(err)
    }
  });

// production user would want to see individual entries in a given list for an event
router.get('/:listId', async (req, res, next) => {
    try {
        const list = await listEntry.findAll({
            where: {
                listId: req.params.listId,
                },
                // explicitly select only attributes wanted for all events view
                attributes: [ 'id', 'name' ]
            });
        res.json(list);
    }  catch (err) {
        next(err)
      }
});
