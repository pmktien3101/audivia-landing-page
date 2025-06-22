import React, { useState, useEffect } from 'react';
import tourService from '../../../../services/tour';
import './style.css';

const emptyImage = { imageUrl: '', order: 0, name: '' };

const Modal = ({ onClose, onSave, tour }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        duration: '',
        typeId: '',
        thumbnailUrl: '',
        useCustomMap: false,
        customMapImages: [],
        startLatitude: 0,
        startLongitude: 0,
    });
    const [tourTypes, setTourTypes] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [errorTypes, setErrorTypes] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchTourTypes = async () => {
            setLoadingTypes(true);
            setErrorTypes(null);
            try {
                const res = await tourService.getTourTypes();
                setTourTypes(res || []);
            } catch (e) {
                setErrorTypes('Không lấy được loại tour');
            } finally {
                setLoadingTypes(false);
            }
        };
        fetchTourTypes();
    }, []);

    useEffect(() => {
        if (tour) {
            setForm({
                ...form,
                ...tour,
                customMapImages: tour.customMapImages || [],
            });
        } else {
            setForm({
                title: '',
                description: '',
                location: '',
                price: '',
                duration: '',
                typeId: '',
                thumbnailUrl: '',
                useCustomMap: false,
                customMapImages: [],
                startLatitude: 0,
                startLongitude: 0,
            });
        }
        // eslint-disable-next-line
    }, [tour]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (idx, e) => {
        const { name, value } = e.target;
        const images = [...form.customMapImages];
        images[idx][name] = name === 'order' ? Number(value) : value;
        setForm({ ...form, customMapImages: images });
    };

    const handleCustomMapImageUpload = async (idx, e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'audivia_preset');
        
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dgzn2ix8w/image/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            
            const images = [...form.customMapImages];
            images[idx].imageUrl = data.secure_url;
            setForm({ ...form, customMapImages: images });
        } catch (err) {
            alert('Upload ảnh thất bại!');
        } finally {
            setUploading(false);
        }
    };

    const addImage = () => {
        setForm({ ...form, customMapImages: [...form.customMapImages, { ...emptyImage }] });
    };

    const removeImage = (idx) => {
        const images = [...form.customMapImages];
        images.splice(idx, 1);
        setForm({ ...form, customMapImages: images });
    };

    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'audivia_preset');
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dgzn2ix8w/image/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            setForm({ ...form, thumbnailUrl: data.secure_url });
        } catch (err) {
            alert('Upload ảnh thất bại!');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            price: form.price ? Number(form.price) : 0,
            duration: form.duration ? Number(form.duration) : 0,
            startLatitude: 0,
            startLongitude: 0,
        };
        if (!form.useCustomMap) delete payload.customMapImages;
        if (!form.thumbnailUrl) payload.thumbnailUrl = null;
        onSave(payload);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">{tour ? 'Sửa tour' : 'Tạo tour mới'}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Tên tour
                        <input name="title" value={form.title} onChange={handleChange} placeholder="Tên tour" required className="modal-input"/>
                    </label>
                    <label>
                        Mô tả
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" rows={2} className="modal-input"/>
                    </label>
                    <label>
                        Địa điểm
                        <input name="location" value={form.location} onChange={handleChange} placeholder="Địa điểm" required className="modal-input"/>
                    </label>
                    <div className="modal-row">
                        <label className="modal-col">
                            Giá
                            <input name="price" value={form.price} onChange={handleChange} placeholder="Giá" required type="number" min={0} className="modal-input"/>
                        </label>
                        <label className="modal-col">
                            Thời gian (giờ)
                            <input name="duration" value={form.duration} onChange={handleChange} placeholder="Thời gian" required type="number" min={0} className="modal-input"/>
                        </label>
                    </div>
                    <div className="modal-row">
                        <label className="modal-col">
                            Vĩ độ bắt đầu
                            <input name="startLatitude" value={form.startLatitude} onChange={handleChange} placeholder="Vĩ độ bắt đầu" type="number" className="modal-input"/>
                        </label>
                        <label className="modal-col">
                            Kinh độ bắt đầu
                            <input name="startLongitude" value={form.startLongitude} onChange={handleChange} placeholder="Kinh độ bắt đầu" type="number" className="modal-input"/>
                        </label>
                    </div>
                    <label>
                        Loại tour
                        {loadingTypes ? (
                            <div className="modal-loading">Đang tải...</div>
                        ) : errorTypes ? (
                            <div className="modal-error">{errorTypes}</div>
                        ) : (
                            <select name="typeId" value={form.typeId} onChange={handleChange} required className="modal-input">
                                <option value="">Chọn loại tour</option>
                                {tourTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        )}
                    </label>
                    <label>
                        Ảnh đại diện
                        <div className="modal-file-wrapper">
                            <label htmlFor="thumbnail-upload" className="modal-file-label">
                                Chọn tệp
                            </label>
                            <input
                                id="thumbnail-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailUpload}
                                style={{ display: 'none' }}
                            />
                            <span className="modal-file-chosen">
                                {form.thumbnailUrl ? 'Đã chọn ảnh' : 'Chưa chọn tệp'}
                            </span>
                        </div>
                        {uploading && <div style={{color:'#aaa'}}>Đang upload...</div>}
                        {form.thumbnailUrl && (
                            <img src={form.thumbnailUrl} alt="thumbnail" style={{width: '300px', marginTop: 8, borderRadius: 8}} />
                        )}
                    </label>
                    <label className="modal-checkbox-row">
                        <input type="checkbox" name="useCustomMap" checked={form.useCustomMap} onChange={handleChange}/>
                        Sử dụng bản đồ tuỳ chỉnh
                    </label>
                    {form.useCustomMap && (
                        <div className="modal-custom-map">
                            <div className="modal-custom-map-header">
                                <span className="modal-custom-map-title">Ảnh bản đồ tuỳ chỉnh</span>
                                <button type="button" onClick={addImage} className="modal-add-image">+ Thêm ảnh</button>
                            </div>
                            {form.customMapImages.length === 0 && <div className="modal-no-image">Chưa có ảnh nào</div>}
                            {form.customMapImages.map((img, idx) => (
                                <div key={idx} className="modal-image-row">
                                    <div className="modal-image-upload-wrapper">
                                        <label htmlFor={`custom-map-upload-${idx}`} className="modal-file-label">
                                            Chọn ảnh
                                        </label>
                                        <input
                                            id={`custom-map-upload-${idx}`}
                                            type="file"
                                            accept="image/*"
                                            onChange={e => handleCustomMapImageUpload(idx, e)}
                                            style={{ display: 'none' }}
                                        />
                                        <span className="modal-file-chosen">
                                            {img.imageUrl ? 'Đã chọn ảnh' : 'Chưa chọn tệp'}
                                        </span>
                                    </div>
                                    <input name="order" value={img.order} onChange={e => handleImageChange(idx, e)} placeholder="Thứ tự" type="number" min={0} className="modal-image-order"/>
                                    <input name="name" value={img.name} onChange={e => handleImageChange(idx, e)} placeholder="Tên ảnh" className="modal-image-name"/>
                                    <button type="button" onClick={() => removeImage(idx)} className="modal-remove-image">&times;</button>
                                    {img.imageUrl && (
                                        <img src={img.imageUrl} alt={`custom map ${idx}`} style={{width: '200px', marginTop: 8, borderRadius: 8}} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="modal-cancel">Huỷ</button>
                        <button type="submit" className="modal-save">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal; 