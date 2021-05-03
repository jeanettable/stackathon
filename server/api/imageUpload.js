const router = require('express').Router();
const multer = require('multer');
const upload = multer( { dest: 'uploads/'} );
const { uploadFile, getFileStream } = require('../services/fileUploader');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { User } = require('../db/models/user');

module.exports = router

// GET /api/image-upload/:key
router.get('/:key', async (req, res, next) => {
    try {
        const key = req.params.key;
        const readStream = getFileStream(key);
        readStream.pipe(res);
    } catch (err) {
        next(err);
    }    
});

// POST /api/image-upload
router.post('/', upload.single('Image'), async (req, res, next) => {
    try {
        const file = req.file;
        console.log('file>>>', file);
        const result = await uploadFile(file);
        console.log('result>>>', result);
        await unlinkFile(file.path);
        res.send( { imagePath: `/image-upload/${result.Key}`} );
    } catch (err)   {
        next(err)
    }
});