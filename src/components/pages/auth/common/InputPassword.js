import { FaLock } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import { useContext } from 'react';
import { LanguageContext } from '../../../../context/LanguageContext';// Import the language context

const InputPassword = ({text}) => {
  const { isArabic } = useContext(LanguageContext); // Get the current language state

  return (
    <div className="mb-4" dir={isArabic ? "rtl" : "ltr"}> {/* Change direction based on language */}
      <label className="block text-myGreen" htmlFor="password">
        {text} {/* Change label based on language */}
      </label>
      <div className="flex items-center border border-myGreen rounded p-2">
        <FaLock className="text-myGreen" size={20} />
        <input 
          type="password" 
          id="password" 
          className={`w-full p-2 outline-none ${isArabic ? 'text-right' : 'text-left'}`} 
          placeholder={text}
        />
        <MdOutlineVisibility className="text-myGreen" size={24} />
      </div>
    </div>
  );
}

export default InputPassword;
