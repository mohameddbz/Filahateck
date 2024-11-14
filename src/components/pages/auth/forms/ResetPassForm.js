import React, { useContext } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';
import translations from './../../../../utils/constant/RessetPassword';
import InputPassword from '../common/InputPassword';
import ButtonConfirm from './../common/ButtonConfirm';

const ResetPassForm = () => {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-myGreen text-3xl font-bold mb-6 text-center">
        {texts.resetPasswordTitle}
      </h2>
      <form>
        <InputPassword text={texts.password} />
        <InputPassword text={texts.confirmPassword} />
        <ButtonConfirm text={texts.finish} />
      </form>
    </div>
  );
};

export default ResetPassForm;
