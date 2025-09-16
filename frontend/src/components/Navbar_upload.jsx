import React from 'react';

const Navbar_upload = ({ sidebarOpen, isMobile }) => {
  return (
    <nav className={`dashboard-navbar ${sidebarOpen ? 'with-sidebar' : 'without-sidebar'} ${isMobile ? 'mobile' : 'desktop'}`}>
      <div className="navbar-content">
        <div className="navbar-brand">
          <h1>EduAuth</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_upload;
