const router = require('express').Router()
const Detail = require('../db')
module.exports = router


// GET /api/users/:userId/edit      // for pre-populated editing
router.get('/users/:userId/edit', async (req, res, next) => {
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

// POST /api/users/:userId/edit    // submit edited input display fields
router.post('/users/:userId/edit', async (req, res, next) => {
    try {
        const updates = await Detail.findOne({
            where: {
                userId: req.params.userId,
            }
        });
        await updates.update(req.body);
        res.json(updates);
    } catch (err)   {
        next(err)
    }
});

// My question becomes...how do I route the responses from './api/image-upload'
// to the Detail model under resume, and headshot??