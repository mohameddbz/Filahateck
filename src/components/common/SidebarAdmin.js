import React, { useEffect, useState } from 'react';
import profileImage from "./../../assets/user/profile.webp";
import { sidebarItems } from "./../../data/admin/Sidebar";
import { NavLink } from 'react-router-dom';
import { makeRequest } from './../../utils/api/httpService'; // Assuming this is your custom API service
import {useAuth} from './../../context/AuthProvider'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userInfo, setUserInfo] = useState({ userName: '', role: '' });
  const {logout} = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await makeRequest('/users/get', 'GET');
        if (response.data.data) {
          const res = await makeRequest(`/users/${response.data.data.user_id}`, 'GET');
          setUserInfo({
            userName: res.data.data.userName || 'Default Name',
            role: response.data.data.role_id || 'Agriculteur',
          });
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

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
          <h3 className="mt-3 text-xl font-semibold">{userInfo.userName}</h3>
          <p className="text-lg text-black">{userInfo.role}</p>
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
        
              <NavLink
                onClick={() =>  {
                  logout();
                }}
                className="block mt-3 w-full py-1 px-2  font-semibold hover:text-white shadow-lg drop-shadow-md rounded-lg hover:bg-myOrange"
              >
                Se déconnecter
              </NavLink>
       
        </nav>
    </div>
  );
};

export default Sidebar;
