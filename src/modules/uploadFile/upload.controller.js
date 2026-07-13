const asyncHandler = require('@/utils/asyncHandler');
const { sendSuccess } = require('@/utils/response');
const AppError = require('@/utils/AppError');
const fs = require('fs');
const path = require('path');
const uploadService = require('@/modules/uploadFile/upload.service');

const uploadFiles = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new AppError('Please select at least one file to upload', 400);
  }
  console.log('🚀 ~ req:', req);

  // const result = req.files.map((file) => {
  //   const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
  //   return {
  //     fileName: file.filename,
  //     originalName: file.originalname,
  //     size: file.size,
  //     mimetype: file.mimetype,
  //     url: fileUrl,
  //   };
  // });
  const dbFiles = await Promise.all(
    req.files.map((file) => {
      return uploadService.uploadFiles({
        originalName: file.originalname,
        fileName: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        user: req.user.id,
      });
    })
  );

  const result = dbFiles.map((file) => {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.fileName}`;
    return {
      id: file._id,
      originalName: file.originalName,
      fileName: file.fileName,
      size: file.size,
      mimetype: file.mimetype,
      url: fileUrl,
    };
  });

  sendSuccess(res, 201, result, 'Upload các file thành công');
});

const getAllFiles = asyncHandler(async (req, res) => {
  const dbFiles = await uploadService.getAllFiles(req.user.id);
  const result = dbFiles.map((file) => {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.fileName}`;
    return {
      id: file._id,
      name: file.originalName,
      size: file.size,
      mimetype: file.mimetype,
      url: fileUrl,
    };
  });
  sendSuccess(res, 200, result, 'Get all files successfully');
});

module.exports = { uploadFiles, getAllFiles };
