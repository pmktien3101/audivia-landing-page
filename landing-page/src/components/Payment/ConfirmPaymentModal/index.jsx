import React from 'react';
import './style.css'
export default function ConfirmPaymentModal({ open, onClose, onConfirm, tour }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Xác nhận thanh toán</h3>
        <p>
          Bạn có chắc muốn thanh toán tour:
          <br />
          <b>{tour?.title || 'Không có tên'}</b>
          <br />
          <b>với giá {tour?.price?.toLocaleString() || '0'} VNĐ?</b>
        </p>
        <div style={{ marginTop: 16 }}>
          <button onClick={onConfirm}>Xác nhận</button>
          <button onClick={onClose} style={{ marginLeft: 8 }}>Hủy</button>
        </div>
      </div>
    </div>
  );
}