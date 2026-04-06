const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

/**
 * Upload a buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer from multer
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<{url: string, publicId: string}>}
 */
const uploadToCloudinary = (fileBuffer, folder = 'portfolio') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1200, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(new ApiError(`Image upload failed: ${error.message}`, 500));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );
    stream.end(fileBuffer);
  });
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - The public ID to delete
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`Failed to delete image ${publicId}:`, error.message);
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
