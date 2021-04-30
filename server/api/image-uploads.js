const router = require('express').Router();
const upload = require('../services/fileUploader');

const singleImageUpload = upload.single('image');

router.post('/image-upload', function (req, res) {
    singleImageUpload(req, res, function(err) {
        //handle error
        return res.json( { 'imageUrl' : req.file.location } )
    });
});

module.exports = router
