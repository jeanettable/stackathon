const router = require('express').Router();
const { upload, upload2 } = require('../services/fileUploader');

const singleImageUpload = upload.single('image');
const singlePdfUpload = upload2.single('pdf');

// POST /api/users/:userId/edit/image-upload
router.post('/image-upload', function (req, res) {
    singleImageUpload(req, res, function(err) {
        //handle error
        return res.json( { 'imageUrl' : req.file.location } )
    });
});

// POST api/users/:userId/edit/pdf-upload
router.post('/pdf-upload', function (req, res, next) {
    try {
        singlePdfUpload(req, res, function(err) {
            //handle error
            return res.json( { 'pdfUrl' : req.file.location } )
        });
    } catch (err) {
        next (err)
    } 
});

module.exports = router
