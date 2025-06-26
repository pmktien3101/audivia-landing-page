import React from 'react';
import Header from '../../screens/CustomerPage/components/Header';
import './style.css';
import { Toaster } from 'react-hot-toast';

const CustomerLayout = ({ children }) => {
  return ( 
    <div className="customer-layout">
      <Header />
      <Toaster
        position="top-center"
        gutter={8}
        containerStyle={{ top: '80px' }}
        reverseOrder={false}
        toastOptions={{
          style: {
            background: 'linear-gradient(135deg, #00A5CF, #d6a4ff)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          },
        }}
      />
      <div className="content-wrapper">
        <main className="customer-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout; 