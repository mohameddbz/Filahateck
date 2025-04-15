import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './../../common/SidebarAdmin';

const SidebarLayoutAdmin = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-grow">
        {/* Sidebar will remain on the left */}
        <Sidebar /> 
        
        <div className="flex-grow ml-[20%] overflow-y-auto p-4 md:p-6">
          {/* Content of the selected page will be rendered here */}
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default SidebarLayoutAdmin;
