import React from 'react';

interface NoHeaderLayoutProps {
  children: React.ReactNode;
}

const NoHeaderLayout: React.FC<NoHeaderLayoutProps> = ({ children }) => {
  return ( 
    <div className="no-layout-container">
      <main className="main-container">{children}</main>
    </div>
  );
};

export default NoHeaderLayout; 