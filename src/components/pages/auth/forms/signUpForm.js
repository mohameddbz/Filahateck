import React, { useContext } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';
import { Link } from 'react-router-dom';
import InputEmail from '../common/InputEmail';
import InputPassword from '../common/InputPassword';
import ButtonConfirm from './../common/ButtonConfirm';
import SelectorRole from './../SignUp/selectedRole';
import translations from './../../../../utils/constant/SignUp'; // Adjust the path

const SignUpForm = () => {
  const { isArabic } = useContext(LanguageContext);
  const text = isArabic ? translations.arabic : translations.french;

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-myGreen text-3xl font-bold mb-4 text-center">
        {text.createAccount}
      </h2>
      <form>
        <InputEmail />
        <InputPassword text={text.password} />
        <InputPassword text={text.confirmPassword} />
        <SelectorRole />
        <ButtonConfirm text={text.createAccount} />
      </form>
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
