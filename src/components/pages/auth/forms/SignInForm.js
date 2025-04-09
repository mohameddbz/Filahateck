import React, { useContext, useState } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';
import InputEmail from '../common/InputEmail';
import InputPassword from '../common/InputPassword';
import ButtonConfirm from './../common/ButtonConfirm';
import { Link, useNavigate } from 'react-router-dom';
import translations from './../../../../utils/constant/SignIn'; 
import { makeRequest } from './../../../../utils/api/httpService';
import {useAuth} from './../../../../context/AuthProvider';

const SignInForm = () => {
  const { isArabic } = useContext(LanguageContext);
  const text = isArabic ? translations.arabic : translations.french;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const data = { email, password };
    try {
      const response = await makeRequest('/auth/login', 'POST', data);
      if (response) {
        const { token } = response.data.data;
        const { roleName } = response.data.data.user;
        const { userId } = response.data.data.user;
        localStorage.setItem('Token', token);
        const userData = { role:'', token : token  };
        switch (roleName) {
          case 'Admin':
            userData.role = 'admin';
            login(userData);
            navigate('/admin/UserManagement');
            break;
          case 'Manager':
            userData.role = 'manager';
            login(userData);
            navigate('/manager/Dashboard');
            break;
          case 'User':
            userData.role = 'user';
            login(userData);
            navigate('/user/marketplace');
            break;
          case 'Seller':
            userData.role = 'seller';
            login(userData);
            try {
              const response = await makeRequest(`/userSellerRole/${userId}`, 'GET');
             console.log(response.status);
             if(response.status === 200){
               localStorage.setItem('sellerRole', response.data.data.sellerRole.roleName);
               navigate('/seller/marketplace');
             }
            } catch (error) {
              console.log(error)
            }
            break ; 
             
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
