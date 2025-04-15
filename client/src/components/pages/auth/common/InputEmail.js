import { useContext } from 'react';
import { MdEmail } from "react-icons/md";
import { LanguageContext } from '../../../../context/LanguageContext';

const InputEmail = ({ value, onChange }) => {
  const { isArabic } = useContext(LanguageContext); 
  return (
    <div className="mb-2" dir={isArabic ? "rtl" : "ltr"}> {/* Change direction based on language */}
      <label className="block text-myGreen" htmlFor="email">
        {isArabic ? 'البريد الإلكتروني' : 'Email'} {/* Change label based on language */}
      </label>
      <div className="flex items-center border border-myGreen rounded p-2">
        <MdEmail className="text-myGreen" size={24} />
        <input
          type="email"
          id="email"
          name="email"
          value={value}
          onChange={onChange}
          className={`w-full p-1 outline-none ${isArabic ? 'text-right' : 'text-left'}`} 
          placeholder={isArabic ? 'البريد الإلكتروني' : 'Email'} 
          required
        />
      </div>
    </div>
  );
}

export default InputEmail;
