import profileImage from "./../../assets/user/profile.webp";
import { sidebarItems } from "./../../data/Sidebar/Sidebardata";
import { NavLink } from 'react-router-dom';
import {useAuth} from './../../context/AuthProvider';
import React, { useState, useEffect } from "react";
import { makeRequest } from "./../../utils/api/httpService";
import { LanguageContext } from './../../context/LanguageContext';
import { useContext } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const {logout} = useAuth();
  const { toggleToArabic, toggleToFrench } = useContext(LanguageContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    wilaya: "",
    phoneNumber: "",
    roleName:""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await makeRequest("/users/profile", "GET", null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
        console.log(response.data.data)
        const fetchedUser = response.data.data;
        setUser(fetchedUser);
        setFormData({
          userName: fetchedUser.userName,
          wilaya: fetchedUser.wilaya || "",
          phoneNumber: fetchedUser.phoneNumber || "",
          roleName:fetchedUser.roleName || ""
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
<div 
      className={`${
        isOpen ? 'w-64 translate-x-0' : 'w-16 -translate-x-full md:translate-x-0'
      } bg-SidebarColor p-4 flex flex-col fixed h-full overflow-y-auto transition-all duration-300 z-10`}
    >      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-lg font-semibold mb-4 flex justify-end"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      
      {/* Only show profile when sidebar is open */}
      {isOpen && (
        <div className="text-center mb-8">
          <img src={profileImage} alt="Profile" className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto" />
          <h3 className="mt-3 text-lg md:text-xl font-semibold">{formData.userName}</h3>
          <p className="text-md md:text-lg text-SidebarColor">{formData.roleName}</p>
          
          {/* Language buttons */}
          <div className="flex justify-center space-x-2 mt-2">
            <button
              onClick={toggleToArabic}
              className="bg-myGreen text-white px-3 py-1 rounded-lg hover:bg-opacity-90 transition"
            >
              Ar
            </button>
            <button
              onClick={toggleToFrench}
              className="bg-myGreen text-white px-3 py-1 rounded-lg hover:bg-opacity-90 transition"
            >
              Fr
            </button>
          </div>
        </div>
      )}
      
      {/* When sidebar is collapsed, show language buttons at the top */}
      {!isOpen && (
        <div className="flex flex-col items-center space-y-2 mb-4">
          <button
            onClick={toggleToArabic}
            className="bg-myGreen text-white w-10 h-8 rounded-lg hover:bg-opacity-90 transition text-xs"
          >
            Ar
          </button>
          <button
            onClick={toggleToFrench}
            className="bg-myGreen text-white w-10 h-8 rounded-lg hover:bg-opacity-90 transition text-xs"
          >
            Fr
          </button>
        </div>
      )}
      
      <nav className={`${isOpen ? 'px-2' : 'px-0'} text-center`}>
        <ul className="space-y-3 text-lg flex flex-col">
          {sidebarItems.map((item, index) => (
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