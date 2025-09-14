import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import '../css/Sidebar.css';
import { ChartColumnStacked } from 'lucide-react';
import { FileUp } from 'lucide-react';
import { FileQuestionMark } from 'lucide-react';


const Dashboard = lazy(() => import('./Dashboard'));
// const Users = lazy(() => import('./Users'));  
// const Products = lazy(() => import('./Products'));
// const Analytics = lazy(() => import('./Analytics'));
const Upload = lazy(() => import('./Upload'));
const Appeal = lazy(() => import('./Appeal'));
// const Settings = lazy(() => import('./Settings'));
// const Help = lazy(() => import('./Help'));

// Loading component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

const Sidebar = () => {
  // Component registry for easy management
  const componentRegistry = useMemo(() => ({
    dashboard: { component: Dashboard, label: 'Dashboard', icon:     <ChartColumnStacked />
 },
    upload: { component: Upload, label: 'Upload Documents', icon:     <FileUp />
 },
    appeal: { component: Appeal, label: 'Appeals', icon:     <FileQuestionMark />
 }
  }), []);

  // Initialize sidebar state
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebar-open');
      return savedState !== null 
        ? JSON.parse(savedState) 
        : window.innerWidth > 768;
    }
    return true;
  });

  // Initialize active component from URL or localStorage
  const [activeComponent, setActiveComponent] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check URL first
      const path = window.location.pathname.slice(1) || 'dashboard';
      const validComponent = componentRegistry[path] ? path : 'dashboard';
      
      // Fallback to localStorage
      const savedComponent = localStorage.getItem('active-component') || validComponent;
      return componentRegistry[savedComponent] ? savedComponent : 'dashboard';
    }
    return 'dashboard';
  });

  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  });

  // Persist sidebar state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-open', JSON.stringify(isOpen));
    }
  }, [isOpen]);

  // Persist active component
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('active-component', activeComponent);
      // Update URL without page reload
      const newPath = `/${activeComponent}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, '', newPath);
      }
    }
  }, [activeComponent]);

  // Handle window resize with debouncing
  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);

        if (mobile && isOpen) {
          const userHasInteracted = localStorage.getItem('sidebar-user-interaction');
          if (!userHasInteracted) {
            setIsOpen(false);
          }
        }
      }, 150);
    };

    // Handle browser back/forward navigation
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || 'dashboard';
      const validComponent = componentRegistry[path] ? path : 'dashboard';
      setActiveComponent(validComponent);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      window.addEventListener('popstate', handlePopState);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('popstate', handlePopState);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [isOpen, componentRegistry]);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebar-user-interaction', 'true');
      }
      
      return newState;
    });
  }, []);

  // Handle navigation clicks
  const handleNavClick = useCallback((componentId) => {
    setActiveComponent(componentId);
    
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Handle overlay click
  const handleOverlayClick = useCallback(() => {
    setIsOpen(false);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-user-interaction', 'true');
    }
  }, []);
// In your existing Sidebar component, update the renderActiveComponent function:

const renderActiveComponent = () => {
  const componentConfig = componentRegistry[activeComponent];
  
  if (!componentConfig) {
    return (
      <div className="error-container">
        <h2>Component not found</h2>
        <p>The requested component could not be loaded.</p>
      </div>
    );
  }

  const Component = componentConfig.component;
  
  // Pass sidebar state as props to components that need it
  if (activeComponent === 'dashboard') {
    return <Component sidebarOpen={isOpen} isMobile={isMobile} />;
  }
  
  // For other components that might need sidebar state
  return <Component sidebarOpen={isOpen} isMobile={isMobile} />;
};


  return (
    <div className="app-layout">
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={handleOverlayClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Escape' && handleOverlayClick()}
          aria-label="Close sidebar"
        />
      )}
      
      {/* Hamburger Menu Button */}
      <button 
        className={`hamburger ${isOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
        type="button"
      >
        <span className="hamburger-line" aria-hidden="true"></span>
        <span className="hamburger-line" aria-hidden="true"></span>
        <span className="hamburger-line" aria-hidden="true"></span>
      </button>

      {/* Sidebar Navigation */}
      <nav 
        className={`sidebar ${isOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : 'desktop'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            {isOpen ? <span>Company</span> : <span>C</span>}
          </h2>
        </div>

        <ul className="sidebar-nav" role="menubar">
          {Object.entries(componentRegistry).map(([id, config]) => (
            <li key={id} className="nav-item" role="none">
              <button
                className={`nav-link ${activeComponent === id ? 'active' : ''}`}
                onClick={() => handleNavClick(id)}
                role="menuitem"
                aria-current={activeComponent === id ? 'page' : undefined}
                type="button"
              >
                <span className="nav-icon" aria-hidden="true">{config.icon}</span>
                {isOpen && <span className="nav-label">{config.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className={`main-content ${isOpen ? 'sidebar-open' : 'sidebar-closed'} ${isMobile ? 'mobile' : 'desktop'}`}>
        <Suspense fallback={<LoadingSpinner />}>
          {renderActiveComponent()}
        </Suspense>
      </main>
    </div>
  );
};

export default Sidebar;
