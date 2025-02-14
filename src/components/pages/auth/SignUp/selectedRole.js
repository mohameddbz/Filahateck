
import { useContext } from 'react';
import { IoMdPerson } from "react-icons/io";
import { LanguageContext } from '../../../../context/LanguageContext'; // Import the language context

const SelectorRole = ({ value, onChange, options ,name="role" }) => {
  const { isArabic } = useContext(LanguageContext); // Get the current language state

  return (
    <div className="mb-2">
        <label className="block text-myGreen " dir={isArabic ? "rtl" : "ltr"}>
            {isArabic ? 'اختر اللغة' : 'Choisir la langue'}
        </label>
        <div className='relative' dir={isArabic ? "rtl" : "ltr"}>
            <IoMdPerson className="absolute left-2 top-4 text-myGreen"  size={24} />
            <select
              name={name}
              value={value}
              onChange={onChange}
              className="w-full border border-myGreen rounded p-1 pl-10 bg-white h-[60px]"
              required
            >
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className={isArabic ? 'text-right' : 'text-left'}
                >
                  {isArabic ? option.labelArabic : option.label}
                </option>
              ))}
            </select>
        </div>
    </div>
  );
}

export default SelectorRole;
