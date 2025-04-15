import React, { useContext } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';
import translations from './../../../../utils/constant/ForgotPassword';
import InputEmail from '../common/InputEmail';
import ButtonConfirm from './../common/ButtonConfirm';
import { Link } from 'react-router-dom';

const ForgotPassForm = () => {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-myGreen text-3xl font-bold mb-6 text-center">
        {texts.forgotPasswordTitle}
      </h2>
      <form>
        <InputEmail />
        <ButtonConfirm text={texts.sendCode} />
        <div className="flex justify-center text-center m-8 text-md">
          <p>{texts.codeSentMessage}</p>
        </div>
        <div className="flex gap-8 m-4">
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="border border-myGreen p-4 text-center rounded-lg w-1/6 h-20 text-2xl"
            />
          ))}
        </div>
        <Link to="/auth/RessetPassword">
          <ButtonConfirm text={texts.confirm} />
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassForm;
