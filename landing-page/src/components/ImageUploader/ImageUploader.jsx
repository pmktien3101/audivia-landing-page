import React from 'react';
import { FiImage } from 'react-icons/fi';

import toast from 'react-hot-toast';
import { uploadImageToCloudinary } from '../../services/cloudinary';

export const ImageUploader = ({ onImageUploaded }) => {
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      try {
        const url = await uploadImageToCloudinary(file);
        onImageUploaded(url); // callback truyền URL về cha
      } catch (err) {
        toast.error('Lỗi khi upload ảnh');
        console.error(err);
      }
    }
  };

  return (
    <label className="action-btn">
      <FiImage size={20} />
      <span>Thêm ảnh</span>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </label>
  );
};
