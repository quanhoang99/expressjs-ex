const express = require('express');
const { auth } = require('@/middlewares');
const upload = require('@/utils/upload');
const uploadController = require('@/modules/uploadFile/upload.controller');

const router = express.Router();

router.post('/', auth, upload.array('files', 5), uploadController.uploadFiles);
router.get('/', auth, uploadController.getAllFiles);
module.exports = router;
