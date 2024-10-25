import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import InputEmail from '../common/Input/InputEmail';
import InputPassword from '../common/Input/InputPassword';
import ButtonConfirm from '../common/Button/ButtonConfirm';
import ButtonLang from '../common/Button/ButtonLang';
import { Link } from 'react-router-dom';

const ForgotPassForm = () => {
  const { isArabic} = useContext(LanguageContext);

  return (
    <div className="w-full max-w-sm mx-auto">
      <ButtonLang/>
      <h2 className="text-green-700 text-3xl font-bold mb-6 text-center">
        {isArabic ? ' قم بكتابةالبريد الالكتروني '  : 'Entrez votre adresse e-mail'}
      </h2>
      <form>
        <InputEmail/>
        <ButtonConfirm text={isArabic ? 'ارسال الرقم' : 'Envoyer le code'} />
        <div className="flex justify-center text-center m-8 text-md">
            <p>{isArabic ? 'تم إرسال رمز مكون من 5 أرقام إلى عنوان البريد الإلكتروني المقدم' : 'Un code de 5 chiffres a été envoyé dans l’adresse e-mail fournie'}</p>
        </div>
        <div className="flex gap-8 m-4">
          <input type="text" maxlength="1" className="border border-green-500 p-4 text-center rounded-lg w-1/6 h-20 text-2xl" />
          <input type="text" maxlength="1" className="border border-green-500 p-4 text-center rounded-lg w-1/6 h-20 text-2xl" />
          <input type="text" maxlength="1" className="border border-green-500 p-4 text-center rounded-lg w-1/6 h-20 text-2xl" />
          <input type="text" maxlength="1" className="border border-green-500 p-4 text-center rounded-lg w-1/6 h-20 text-2xl" />
          <input type="text" maxlength="1" className="border border-green-500 p-4 text-center rounded-lg w-1/6 h-20 text-2xl" />
        </div>
        <Link to="/ResetPassword">
          <ButtonConfirm text={isArabic ? ' تأكيد' : 'Confirmer'} />
        </Link>
      </form>
    </div>
  )
};

export default ForgotPassForm;
