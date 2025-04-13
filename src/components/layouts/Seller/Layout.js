import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './../../common/Navbar';
import ButtonLang from '../../common/ButtonLang';
import Sidebar from './../../common/SidebarSeller';

const SidebarSellerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* <ButtonLang /> */}
      
      {/* Mobile menu button - only visible on small screens */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-16 left-4 z-20 bg-myOrange text-white p-2 rounded-md shadow-md"
      >
        ☰
      </button>
      
      <div className="flex flex-grow relative">
        {/* Sidebar component with open state passed */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        {/* Main content area */}
        <div className={`flex-grow transition-all duration-300 overflow-y-auto p-3 md:p-6 ${sidebarOpen ? 'ml-16 md:ml-64' : 'ml-0 md:ml-16'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SidebarSellerLayout;