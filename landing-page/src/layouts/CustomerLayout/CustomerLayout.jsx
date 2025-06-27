import React from 'react';
import Header from '../../screens/CustomerPage/components/Header';
import './style.css';
import { Toaster } from 'react-hot-toast';

const CustomerLayout = ({ children }) => {
  return ( 
    <div className="customer-layout">
      <Header />
      <div className="content-wrapper">
        <main className="customer-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout; 