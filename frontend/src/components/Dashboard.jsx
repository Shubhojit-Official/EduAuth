import React, { useState } from 'react';
import '../css/Dashboard.css';
import Card_upload from './Card_upload';

const Dashboard = ({ sidebarOpen, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Search query:', searchQuery);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="dashboard-container">
      {/* Responsive Navbar */}
      <nav className={`dashboard-navbar ${sidebarOpen ? 'with-sidebar' : 'without-sidebar'} ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="navbar-content">
          {/* Left side - Brand/Logo */}
          <div className="navbar-brand">
            <h1>EduAuth</h1>
          </div>

          {/* Right side - Search */}
          <div className="navbar-search">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-input-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="search-input"
                  aria-label="Search"
                />
                <button 
                  type="submit" 
                  className="search-button"
                  aria-label="Submit search"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}

    </div>
  );
};

export default Dashboard;
