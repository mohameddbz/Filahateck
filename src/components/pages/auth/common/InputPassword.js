import { FaLock } from "react-icons/fa";
import { MdOutlineVisibility , MdOutlineVisibilityOff  } from "react-icons/md";
import { useState, useContext } from 'react';
import { LanguageContext } from '../../../../context/LanguageContext';// Import the language context

const InputPassword = ({ text, name, value, onChange }) => {
  const { isArabic } = useContext(LanguageContext); // Get the current language state
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="mb-2" dir={isArabic ? "rtl" : "ltr"}> {/* Change direction based on language */}
      <label className="block text-myGreen" htmlFor="password">
        {text} {/* Change label based on language */}
      </label>
      <div className="flex items-center border border-myGreen rounded p-2">
        <FaLock className="text-myGreen" size={20} />
        <input
          type={isVisible ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-1 outline-none ${isArabic ? 'text-right' : 'text-left'}`}
          placeholder={text}
          required
        />
        <div onClick={toggleVisibility} className="cursor-pointer">
          {isVisible ? (
            <MdOutlineVisibilityOff className="text-myGreen" size={24} />
          ) : (
            <MdOutlineVisibility className="text-myGreen" size={24} />
          )}
        </div>
      </div>
    </div>
  );
}

export default InputPassword;
