// const aws = require('aws-sdk');
// const multer = require('multer');
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
// const multerS3 = require('multer-s3');
require('dotenv').config()

module.exports = { uploadFile, getFileStream }
// exports.uploadFile = uploadFile;

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
// const secretS3Key = process.env.S3_SECRET_KEY;
// const accessS3Id = process.env.S3_ACCESS_ID;

const s3 = new S3({
  region: 'us-west-1',
  accessKeyId,
  secretAccessKey
})

// upload a file to s3:
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: 'stackathon-bucket-1',
    Body: fileStream,
    Key: file.filename,
  }

  return s3.upload(uploadParams).promise()
}

// download functions w/ readstream
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: 'stackathon-bucket-1',
  }
  return s3.getObject(downloadParams).createReadStream();
}


