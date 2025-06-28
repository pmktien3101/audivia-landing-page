import React from 'react'
import './style.css'

export default function DepositModal({ isOpen, onClose, amount, setAmount, onConfirm, isLoading }) {
    if (!isOpen) return null;
  
    return (
      <div className="deposit-modal-overlay">
        <div className="deposit-modal">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          
          <h2 className="modal-title">Nạp tiền vào ví</h2>
          
          <div className="input-group">
            <input 
              type="number" 
              placeholder="Nhập số tiền cần nạp (VND)"
              className="amount-input"
              min="10000"
              step="10000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <button className="submit-btn" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
          </button>
          
          
        </div>
      </div>
    );
  }