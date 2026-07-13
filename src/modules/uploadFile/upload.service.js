const ListFiles = require('./upload.model');
const AppError = require('@/utils/AppError');

const uploadFiles = async (data) => {
  const file = await ListFiles.create(data);
  return file;
};
const getAllFiles = async (userId) => {
  const files = await ListFiles.find({ user: userId });

  if (!files) {
    throw new AppError('Files not found', 404);
  }

  return files;
};
module.exports = { uploadFiles, getAllFiles };
