import React , {useState} from 'react';
import logo from './../../images/logo.png';
import {navLinksdata} from '../../utils/constant/navList'
import { FiMenu } from "react-icons/fi";
import { Link } from 'react-scroll'
import { MdClose } from "react-icons/md";

const Header = () => {
    const [showMenu, setShowMenu]=useState(false)
  return (
    <div className='w-full h-[60px] sticky top-0 z-50 bg-green-600 mx-auto flex justify-between items-center font-titleFont border-b-[1px] border-b-gray-600'>
       <div>
        <img className='h-[50px] w-[100px]' src={logo} alt='logo'/>
       </div>
       <div>
            <ul className='hidden md:inline-flex items-center gap-6 lg:gap-20 pr-20'>
                {navLinksdata.map((navLink)=> (
                    <li className='text-base font-normal text-white text-xl trackin-wide 
                    cursor-pointer hover:text-black duration-300 ' key={navLink.id}>
                      <Link 
                        activeClass="active"
                        to={navLink.link}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                      > {navLink.title}</Link>
                    </li>
                ))}
            </ul>
            <span
              onClick={() => setShowMenu(true)}
              className="text-xl md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full text-designColor cursor-pointer"
            >
              <FiMenu />
            </span>
            {showMenu && (
              <div className="w-[60%] h-screen overflow-scroll absolute top-0 left-0 bg-gray-200 p-4 scrollbar-hide">
                <div className="flex flex-col gap-8 py-2 relative">
                  <div>
                    <img className="w-32" src={logo} alt="logo" />
                  </div>
                  <ul className="flex flex-col gap-4">
                    {navLinksdata.map((item) => (
                      <li
                        key={item._id}
                        className="text-base font-normal text-white-400 tracking-wide cursor-pointer hover:text-designColor duration-300"
                      >
                        <Link
                          onClick={() => setShowMenu(false)}
                          activeClass="active"
                          to={item.link}
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={500}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <span
                    onClick={() => setShowMenu(false)}
                    className="absolute top-4 right-4 text-white-400 hover:text-designColor duration-300 text-2xl cursor-pointer"
                  >
                    <MdClose />
                  </span>
                </div>
              </div>
            )}
        </div> 
    </div>
  );
};

export default Header;


