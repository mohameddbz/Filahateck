import { useContext } from 'react';
import { MdPhone } from "react-icons/md";
import { LanguageContext } from '../../../../context/LanguageContext';

const InputPhone = ({ value, onChange }) => {
  const { isArabic } = useContext(LanguageContext);

  // Handle change to accept only numeric input and ensure the phone number length is 10 digits
  const handleChange = (e) => {
    const newValue = e.target.value;

    // Allow only digits and limit to 10 characters
    if (/^\d{0,10}$/.test(newValue)) {
      onChange(e);
    }
  };

  return (
    <div className="mb-2" dir={isArabic ? "rtl" : "ltr"}>
      <label className="block text-myGreen" htmlFor="phone">
        {isArabic ? 'رقم الهاتف' : 'Phone Number'}
      </label>
      <div className="flex items-center border border-myGreen rounded p-2">
        <MdPhone className="text-myGreen" size={24} />
        <input
          type="tel"
          id="phone"
          name="phone_number"
          value={value}
          onChange={handleChange}
          className={`w-full p-1 outline-none ${isArabic ? 'text-right' : 'text-left'}`}
          placeholder={isArabic ? 'أدخل رقم الهاتف' : 'Enter your phone number'}
          required
        />
      </div>
    </div>
  );
};

export default InputPhone;
