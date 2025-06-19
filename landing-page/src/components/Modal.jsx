import React, { useState, useEffect } from 'react';

const Modal = ({ onClose, onSave, tour }) => {
    const [form, setForm] = useState({
        title: '',
        location: '',
        tourTypeName: '',
        duration: '',
        price: '',
        thumbnailUrl: ''
    });

    useEffect(() => {
        if(tour){
            setForm(tour);
        }else{
            setForm({
                title: '',
                location: '',
                tourTypeName: '',
                duration: '',
                price: '',
                thumbnailUrl: ''
            });
        }
    }, [tour]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
            <div style={{background:'#fff',padding:24,borderRadius:8,minWidth:320}}>
                <h2>{tour ? 'Sửa tour' : 'Tạo tour mới'}</h2>
                <form onSubmit={handleSubmit}>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Tên tour" required style={{width:'100%',marginBottom:8}}/>
                    <input name="location" value={form.location} onChange={handleChange} placeholder="Địa điểm" required style={{width:'100%',marginBottom:8}}/>
                    <input name="tourTypeName" value={form.tourTypeName} onChange={handleChange} placeholder="Loại tour" required style={{width:'100%',marginBottom:8}}/>
                    <input name="duration" value={form.duration} onChange={handleChange} placeholder="Thời gian (giờ)" required style={{width:'100%',marginBottom:8}}/>
                    <input name="price" value={form.price} onChange={handleChange} placeholder="Giá" required type="number" style={{width:'100%',marginBottom:8}}/>
                    <input name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} placeholder="Link ảnh" style={{width:'100%',marginBottom:8}}/>
                    <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
                        <button type="button" onClick={onClose}>Huỷ</button>
                        <button type="submit">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
