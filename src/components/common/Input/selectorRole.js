
import { useContext } from 'react';
import { IoMdPerson } from "react-icons/io";
import { LanguageContext } from '../../../context/LanguageContext'; // Import the language context

const SelectorRole = ({text}) => {
  const { isArabic } = useContext(LanguageContext); // Get the current language state

  return (
    <div className="mb-4">
        <label className="block text-green-700 " dir={isArabic ? "rtl" : "ltr"}>
            {isArabic ? 'اختر اللغة' : 'Choisir la langue'}
        </label>
        <div className='relative' dir={isArabic ? "rtl" : "ltr"}>
            <IoMdPerson className="absolute left-2 top-4 text-green-500"  size={24} />
            <select  className="w-full border border-green-500 rounded p-2 pl-10 bg-white h-[60px]">
                <option value="Agricol" className={isArabic ? 'text-right' : 'text-left'}>
                {isArabic ? 'الفلاح' : 'Agricol'}
                </option>
                <option value="Invisteur" className={isArabic ? 'text-right' : 'text-left'}>
                {isArabic ? 'ممول' : 'Invisteur'}
                </option>
            </select>
        </div>
    </div>
  );
}

export default SelectorRole;
