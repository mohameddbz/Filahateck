import React, { useState } from 'react';
import profileImage from "./../../assets/user/profile.webp";
import { sidebarItems } from "./../../data/Sidebar/Sidebardata";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`${isOpen ? 'w-60' : 'w-16'} bg-SidebarColor p-4 flex flex-col md:w-[21%] fixed h-full overflow-y-auto`}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden mb-4 text-lg font-semibold"
      >
        ☰
      </button>
      {isOpen && (
        <div className="text-center mb-8 mt-4">
          <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full mx-auto" />
          <h3 className="mt-3 text-xl font-semibold">Omar MAJDI</h3>
          <p className="text-lg text-SidebarColor">Agriculteur</p>
        </div>
      )}
      <nav className="ml-6 mr-6 text-center">
        <ul className="space-y-4 text-lg flex flex-col">
          {sidebarItems.map((item, index) => (
            <li key={index} className="w-full">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block w-full py-2 px-4 rounded hover:bg-SidebarColor ${
                    isActive ? 'bg-red-500 text-white' : 'bg-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
