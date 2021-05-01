const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config()


aws.config.update({
    secretAccessKey: process.env.S3_SECRET_KEY,
    accessKeyId: process.env.S3_ACCESS_ID,
    region: 'us-west-1',
})

const s3 = new aws.S3();
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'stackathon-bucket-1',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
      cb(null, req.params.id + Date.now().toString() + '.jpg')
    }
  })
});

const upload2 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'stackathon-bucket-1',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
      cb(null, req.params.id + Date.now().toString() + '.pdf')
    }
  })
});

module.exports = {
  upload,
  upload2
};
