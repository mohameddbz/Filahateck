import React, { useContext } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';
import InputEmail from '../common/InputEmail';
import InputPassword from '../common/InputPassword';
import ButtonConfirm from './../common/ButtonConfirm';
import { Link } from 'react-router-dom';
import translations from './../../../../utils/constant/SignIn'; // Adjust path if needed

const SignInForm = () => {
  const { isArabic } = useContext(LanguageContext);
  const text = isArabic ? translations.arabic : translations.french;

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-myGreen text-3xl font-bold mb-6 text-center">
        {text.signIn}
      </h2>
      <form>
        <InputEmail />
        <InputPassword text={text.password} />
        <div className="text-right text-myGreen mb-4">
          <a href="/auth/ForgotPassword">
            {text.forgotPassword}
          </a>
        </div>
        <Link to="/OffresPage">
          <ButtonConfirm text={text.signIn} />
        </Link>
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
