import React, { useState, useContext } from 'react';
import { LanguageContext } from './../../context/LanguageContext';
import logo from './../../assets/common/logo.png';
import { navLinksdata } from '../../data/Navbar/navbarList';
import { FiMenu } from "react-icons/fi";
import { Link } from 'react-router-dom'; // Use react-router-dom Link instead of react-scroll
import { MdClose ,MdHome,MdPerson,MdOutlineMenu,MdWork,MdEmail,MdArticle } from "react-icons/md";
import { FaGift, FaInfoCircle, FaSignInAlt  } from 'react-icons/fa';

const Navbar = () => {
  const { isArabic } = useContext(LanguageContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='w-full h-[60px] sticky top-0 z-50 bg-myGreen mx-auto flex justify-between items-center font-titleFont border-b-[1px] border-b-gray-600'>
      <div>
        <img className='h-[50px] w-[100px] rounded-full' src={logo} alt='logo' />
      </div>
      <div>
        <ul className='hidden md:inline-flex items-center   gap-6 lg:gap-20 pr-20'>
          {navLinksdata.map((navLink) => (
            <li
              className='text-white text-xl font-bold hover:text-myOrange tracking-wide cursor-pointer  duration-300'
              key={navLink._id}
            >
              <Link to={navLink.link}>
                {isArabic ? navLink.titleAr : navLink.titleFr}
              </Link>
            </li>
          ))}
        </ul>
        <span
          onClick={() => setShowMenu(true)}
          className="text-xl md:hidden py-4 px-4 inline-flex items-center justify-center rounded-full text-designColor cursor-pointer"
        >
          <FiMenu className="text-xl text-white w-10 h-10" />
        </span>
        {showMenu && (
  <div 
    className="w-[60%] h-screen absolute top-0 left-0 bg-SidebarColor shadow-2xl overflow-auto scrollbar-hide"
    style={{
      animation: "slideIn 0.4s ease-out forwards"
    }}
  >
    <style jsx>{`
      @keyframes slideIn {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `}</style>
    
    <div className="flex flex-col gap-8 p-6 relative">
      <div className="flex justify-start items-center">
        <img className="w-36 hover:opacity-90 transition-opacity" src={logo} alt="logo" />
      </div>
      
      <nav>
        <ul className="flex flex-col">
          {navLinksdata.map((item, index) => (
            <li key={item._id}>
              <Link 
                to={item.link} 
                onClick={() => setShowMenu(false)}
                className="text-lg font-medium text-white-400 tracking-wide hover:text-designColor flex items-center gap-3 py-4 transform hover:translate-x-2 transition-transform duration-300"
              >
                {/* Icônes basées sur le type de lien - ajustez selon vos besoins */}
                {item.link === "/" && <MdHome className="text-xl" />}
                {item.link === "/about" && <FaInfoCircle className="text-xl" />}
                {item.link === "/offre" && <FaGift className="text-xl" />}
                {item.link === "/projects" && <MdWork className="text-xl" />}
                {item.link === "/blog" && <MdArticle className="text-xl" />}
                {item.link === "/auth/SignIn" && <FaSignInAlt  className="text-xl" />}
                {/* Si aucune correspondance, afficher une icône par défaut */}
                {!(["/", "/about", "/offre", "/auth/SignIn", "/blog", "/contact"].includes(item.link)) && 
                  <MdOutlineMenu className="text-xl" />
                }
                
                <span>{isArabic ? item.titleAr : item.titleFr}</span>
              </Link>
              {index < navLinksdata.length - 1 && (
                <hr className="border-t border-gray-700 opacity-50 my-1 mx-8" />
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <button
        onClick={() => setShowMenu(false)}
        className="absolute top-6 right-6 text-white-400 hover:text-designColor hover:rotate-90 transition-all duration-300 text-2xl cursor-pointer"
        aria-label="Fermer le menu"
      >
        <MdClose />
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Navbar;
