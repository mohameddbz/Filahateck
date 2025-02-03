import { useContext } from 'react';
import { MdLocationOn } from "react-icons/md";
import { LanguageContext } from '../../../../context/LanguageContext';
import {wilayaOptions} from './../../../../data/auth/wilaya'

const SelectorWilaya = ({ value, onChange }) => {
  const { isArabic } = useContext(LanguageContext);

  return (
    <div className="mb-2" dir={isArabic ? "rtl" : "ltr"}>
      <label className="block text-myGreen" htmlFor="wilaya">
        {isArabic ? 'اختر الولاية' : 'Select Wilaya'}
      </label>
      <div className="flex items-center border border-myGreen rounded p-2">
        <MdLocationOn className="text-myGreen" size={24} />
        <select
          id="wilaya"
          name="wilaya"
          value={value}
          onChange={onChange}
          className={`w-full p-1 outline-none bg-transparent ${isArabic ? 'text-right' : 'text-left'}`}
          required
        >
          <option value="" disabled>
            {isArabic ? 'اختر الولاية' : 'Choose a Wilaya'}
          </option>
          {wilayaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {isArabic ? option.arabic : option.french}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectorWilaya;
