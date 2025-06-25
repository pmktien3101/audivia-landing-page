import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
    const CLOUD_NAME = 'du2e6kunm'
    const UPLOAD_PRESET = 'Audivia_Images'

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET)
    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
    
      return response.data.secure_url;
}