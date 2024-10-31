// src/components/layout/SidebarLayout.js

import React from 'react';
import Sidebar from './Sidebar';


const SidebarLayout = ({ children, Header, ButtonLang }) => {
  return (
    <div className="h-screen flex flex-col">
      {Header && <Header />}
      {ButtonLang && <ButtonLang />}
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
