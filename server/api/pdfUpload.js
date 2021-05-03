const router = require('express').Router();
const multer = require('multer');
const upload = multer( { dest: 'uploads/'} );
const { uploadFile, getFileStream } = require('../services/fileUploader');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

module.exports = router

// GET /api/pdf-upload/:key
router.get('/:key', (req, res, next) => {
    try {
        const key = req.params.key;
        const readStream = getFileStream(key);
    
        readStream.pipe(res);
    } catch (err) {
        next(err);
    }    
});

// POST api/pdf-upload
router.post('/', upload.single('File'), async (req, res, next) => {
    try {
        const file = req.file;
        console.log('file>>>', file);
        const result = await uploadFile(file);
        console.log('result>>>', result);
        await unlinkFile(file.path);
        res.send( { pdfPath: `/pdf-upload/${result.Key}`} );
    } catch (err)   {
        next(err)
    }
});
