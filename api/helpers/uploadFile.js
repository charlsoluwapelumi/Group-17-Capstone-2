const cloudinary = require('cloudinary')

module.exports =  async function  uploadImage(path, type, folder) {
  const get = name => process.env[name];

  
  
  try {
    cloudinary.config({
        cloud_name: get('CLOUDINARY_CLOUD_NAME'),
        api_key: get('CLOUDINARY_API_KEY'),
        api_secret: get('CLOUDINARY_API_SECRET'),
      });

      const response = await cloudinary.v2.uploader.upload(path, {
        resource_type: type,
        folder: folder,
      }, )

      return response.secure_url
   
  } catch (error) {
      console.log(error);
  }
}
