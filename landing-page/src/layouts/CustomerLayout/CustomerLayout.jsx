import React from 'react';


const CustomerLayout = ({ children }) => {
  return ( 
    <div className="no-layout-container">
      <main className="main-container">{children}</main>
    </div>
  );
};

export default CustomerLayout; 