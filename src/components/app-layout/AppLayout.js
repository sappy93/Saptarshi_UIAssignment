import React from 'react';
import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
        {/* Header Layout */}
      <Header />
      <main>
        {/* Main content container */}
        <div className="main-content">{children}</div>
      </main>
      {/* Footer Layout */}
      <Footer />
    </div>
  );
};

export default AppLayout;