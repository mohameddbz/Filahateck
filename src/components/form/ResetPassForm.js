import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import InputEmail from '../common/Input/InputEmail';
import InputPassword from '../common/Input/InputPassword';
import ButtonConfirm from '../common/Button/ButtonConfirm';
import ButtonLang from '../common/Button/ButtonLang';
import { Link } from 'react-router-dom';

const ResetPassForm = () => {
  const { isArabic} = useContext(LanguageContext);

  return (
    <div className="w-full max-w-sm mx-auto">
      <ButtonLang/>
      <h2 className="text-green-700 text-3xl font-bold mb-6 text-center">
        {isArabic ? 'قم بكتابة الرقم السري الجديد ' : 'Entrez votre nouveau mot de passe'}
      </h2>
      <form>
        <InputPassword text={isArabic ? 'كلمة المرور' : 'Mot de passe'}/>
        <InputPassword text={isArabic ? 'تأكيد كلمة المرور' : 'Confirmer mot de passe'} />
        <ButtonConfirm text={isArabic ? 'انتهاء  ' : 'Terminer'} />
      </form>
    </div>
  )
};

export default ResetPassForm;
