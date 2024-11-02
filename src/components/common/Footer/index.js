import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";




import  './footer.css'
function Footer() {
  return (
    <>
    <div className='bg-myGreen w-full pt-20 relative flex flex-col justify-center md:flex-row md:justify-around items-center'>

        <div  className="absolute top-0 left-0 w-full h-[80px] bg-white inline-block"
          style={{
           borderRadius: '51% 49% 49% 51% / 0% 0% 67% 66%',
         }}>
          {/*  ce div est faite pour le curve seulemement  */}
        </div>
        <div className='my-8'>
          <p className='font-semibold text-white' >Vous pouvez nous trouver sur </p> 
          <div className="flex justify-center space-x-6 mt-4">
          {/* Liens vers les réseaux sociaux */}
          <a href="#" className="hover:opacity-80"><SiFacebook size={24} color='white'/></a>
          <a href="#" className="hover:opacity-80"><FaInstagram size={24} color='white'/> </a>
          <a href="#" className="hover:opacity-80"><FaLinkedin size={24} color='white'/></a>
        </div>
        </div>

        <div className='text-white my-8 flex flex-col justify-center items-center'>
            <p className='font-bold text-xl pb-3' >Contact</p>
            <div className='flex flex-row justify-center items-center gap-3'>
            <FaPhoneAlt />
            <p >
                <span className='font-bold' >Tel : </span> +213 567 84 59 21
            </p>
            </div>

            <div className='flex flex-row justify-center items-center gap-3'>
            <MdEmail />
            <p >
                <span className='font-bold' >E-mail : </span> filahatech@gmail.com
            </p>
            </div>
        </div>

        <div className='text-white flex flex-col justify-center items-center'>
            <p className='font-bold text-myGreen' > j</p>
            <div className='flex flex-row justify-center items-center gap-3'>
            <FaPhoneAlt />
            <p >
                <span className='font-bold' >Tel : </span> +213 567 84 59 21
            </p>
            </div>

            <div className='flex flex-row justify-center items-center gap-3'>
            <MdEmail />
            <p >
                <span className='font-bold' >E-mail : </span> filahatech@gmail.com
            </p>
            </div>
        </div>
        
        

    </div>
     
      <div className='bg-myGreen '>
      <hr className=' bg-white'/>
      <p className='text-center py-3 font-semibold text-white'>Copyright © 2024 by FilahaTech. All rights reserved!</p>
      </div>
    </>
  );
}

export default Footer;
