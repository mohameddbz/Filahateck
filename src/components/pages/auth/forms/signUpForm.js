import React, {useState, useContext } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';
import { Link } from 'react-router-dom';
import InputEmail from '../common/InputEmail';
import InputText from '../SignUp/InputText';
import InputPhone from '../SignUp/InputPhon';
import SelectorWilaya from '../SignUp/SelectorWilaya';
import InputPassword from '../common/InputPassword';
import ButtonConfirm from './../common/ButtonConfirm';
import SelectorRole from './../SignUp/selectedRole';
import translations from './../../../../utils/constant/SignUp'; 
import {makeRequest} from './../../../../utils/api/httpService'

const SignUpForm = () => {
  const { isArabic } = useContext(LanguageContext);
  const text = isArabic ? translations.arabic : translations.french;

   // Form State
   const [formData, setFormData] = useState({
    email: '',
    Name:'',
    password: '',
    confirmPassword: '',
    role: '',
    phone_number:'',
    wilaya:''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage(text.passwordMismatch);
      return;
    }

    try {
      const data = {
        email: formData.email,
        userName: formData.Name,
        password: formData.password,
        phone_number: formData.phone_number,
        profile_picture: 'profile.jpg',
        wilaya: formData.wilaya,
        role_id: 1,
      };

      const response = await makeRequest('/auth/register', 'POST', data);
      console.log(response)
      setSuccessMessage(response.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-myGreen text-2xl font-bold mb-2 text-center">
        {text.createAccount}
      </h2>
      <form onSubmit={handleSubmit}>
        <InputText value={formData.Name} onChange={handleInputChange} />
        <InputPhone value={formData.phone_number} onChange={handleInputChange} />
        <InputEmail value={formData.email} onChange={handleInputChange} />
        <InputPassword
          text="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <InputPassword
          text="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <SelectorWilaya value={formData.wilaya} onChange={handleInputChange} />
        <SelectorRole
          value={formData.role}
          onChange={handleInputChange}
          options={[
            { value: 'Agricol', label: 'Farmer', labelArabic: 'الفلاح' },
            { value: 'Investor', label: 'Investor', labelArabic: 'ممول' },
          ]}
        />
        <ButtonConfirm text={text.createAccount} />
      </form>
        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 text-center mt-2">{successMessage}</p>
        )}
      <div className="mt-4 text-center">
        <p className="text-sm">
          {text.alreadyHaveAccount}{' '}
          <Link to="/auth/SignIn" className="text-myGreen">
            {text.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
