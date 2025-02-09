import React, { useContext, useState } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';
import InputEmail from '../common/InputEmail';
import InputPassword from '../common/InputPassword';
import ButtonConfirm from './../common/ButtonConfirm';
import { Link, useNavigate } from 'react-router-dom';
import translations from './../../../../utils/constant/SignIn'; 
import { makeRequest } from './../../../../utils/api/httpService';

const SignInForm = () => {
  const { isArabic } = useContext(LanguageContext);
  const text = isArabic ? translations.arabic : translations.french;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const data = { email, password };
    try {
      const response = await makeRequest('/auth/login', 'POST', data);
      console.log(response.data.data.user)
      if (response) {
        const { token } = response.data.data;
        const { roleName } = response.data.data.user;
        localStorage.setItem('Token', token);
        switch (roleName) {
          case 'Admin':
            navigate('/admin/UserManagement');
            break;
          case 'Manager':
            navigate('/manager/Dashboard');
            break;
          case 'User':
            navigate('/user/marketplace');
            break;
          default:
            setErrorMessage('Unauthorized access.');
        }
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-myGreen text-3xl font-bold mb-6 text-center">
        {text.signIn}
      </h2>
      <form onSubmit={handleSubmit}>
        <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} text={text.password} />
        
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <div className="text-right text-myGreen mb-4">
          <a href="/auth/ForgotPassword">
            {text.forgotPassword}
          </a>
        </div>
        <ButtonConfirm text={loading ? 'Loading...' : text.signIn} onClick={handleSubmit} />
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          {text.noAccount}{' '}
          <Link to="/auth/SignUp" className="text-myGreen">
            {text.createAccount}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
