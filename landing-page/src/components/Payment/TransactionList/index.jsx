import React from 'react'
import './style.css'
import TransactionItem from '../TransactionItem';
export default function TransactionList({ transactions }) {
  return (
    <div className="transaction-list">
      <h3 className="transaction-list__title">Lịch sử giao dịch</h3>
      
      {transactions.length === 0 ? (
        <p className="transaction-list__empty">Không có giao dịch nào</p>
      ) : (
        <div className="transaction-list__items">
          {transactions.map((transaction) => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction} 
            />
          ))}
        </div>
      )}
    </div>
  );
}