import React from 'react'
import './style.css'
export default function TransactionItem({transaction}) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
      };
    
  return (
    <div className='transaction-item'> 
        <div className="transaction-info">
            <div className="transaction-description">{transaction.description}</div>
            <div className="transaction-date">{transaction.date}</div>
        </div>
        <div className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(transaction.amount)}
        </div>

    </div>
  )
}
