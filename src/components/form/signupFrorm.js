import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import InputEmail from '../common/Input/InputEmail';
import InputPassword from '../common/Input/InputPassword';
import ButtonConfirm from '../common/Button/ButtonConfirm';
import ButtonLang from '../common/Button/ButtonLang'
import SelectorRole from '../common/Input/selectorRole';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const { isArabic} = useContext(LanguageContext);

  return (
    <div className="w-full max-w-sm mx-auto">
      <ButtonLang/>
      <h2 className="text-green-700 text-3xl font-bold mb-4 text-center">
        {isArabic ? 'إنشاء حساب' : 'Créer un compte'}
      </h2>
      <form>
        <InputEmail />
        <InputPassword text={isArabic ? 'كلمة المرور' : 'Mot de passe'}/>
        <InputPassword text={isArabic ? 'تأكيد كلمة المرور' : 'Confirmer mot de passe'} />
        <SelectorRole/>
        <ButtonConfirm text={isArabic ? 'إنشاء حساب' : 'Créer un compte'} />
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          {isArabic ? ' لدي حساب؟' : "Je déjà un compte ?"}{' '}
          <Link to="/" className="text-green-600">
          {isArabic ? 'تسجيل الدخول' : 'Se connecter'}
          </Link>
        </p>
      </div>
    </div>
  )
};

export default SignUpForm;
