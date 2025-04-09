import React from 'react';
import profileImage from "./../../assets/user/profile.webp";
import { sidebarSellerItems } from "./../../data/Sidebar/SideBarDataSeller";
import { NavLink } from 'react-router-dom';
import { useAuth } from './../../context/AuthProvider';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  return (
    <div 
      className={`${
        isOpen ? 'w-64 translate-x-0' : 'w-16 -translate-x-full md:translate-x-0'
      } bg-SidebarColor p-4 flex flex-col fixed h-full overflow-y-auto transition-all duration-300 z-10`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-lg font-semibold mb-4 flex justify-end"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      
      {/* Only show profile when sidebar is open */}
      {isOpen && (
        <div className="text-center mb-8">
          <img src={profileImage} alt="Profile" className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto" />
          <h3 className="mt-3 text-lg md:text-xl font-semibold">Omar MAJDI</h3>
          <p className="text-md md:text-lg text-SidebarColor">Agriculteur</p>
        </div>
      )}
      
      <nav className={`${isOpen ? 'px-2' : 'px-0'} text-center`}>
        <ul className="space-y-3 text-lg flex flex-col">
          {sidebarSellerItems.map((item, index) => (
            <li key={index} className="w-full">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block w-full py-1 px-2 font-semibold hover:text-white shadow-md drop-shadow-md rounded-lg hover:bg-myOrange ${
                    isActive ? 'bg-myOrange text-white' : 'bg-white'
                  } ${!isOpen && 'p-1 text-xs'}`
                }
                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
              >
                {isOpen ? item.label : item.label.charAt(0)}
              </NavLink>
            </li>
          ))}
          <li className="w-full mt-6">
            <button
              onClick={() => {
                logout();
                if (window.innerWidth < 768) setIsOpen(false);
              }}
              className={`block w-full py-1 px-2 font-semibold hover:text-white shadow-md drop-shadow-md rounded-lg hover:bg-myOrange bg-white ${!isOpen && 'p-1 text-xs'}`}
            >
              {isOpen ? 'Se déconnecter' : 'D'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;