import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import InputEmail from '../common/Input/InputEmail';
import InputPassword from '../common/Input/InputPassword';
import ButtonConfirm from '../common/Button/ButtonConfirm';
import ButtonLang from '../common/Button/ButtonLang';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { isArabic} = useContext(LanguageContext);

  return (
    <div className="w-full max-w-sm mx-auto">
      <ButtonLang/>
      <h2 className="text-green-700 text-3xl font-bold mb-6 text-center">
        {isArabic ? 'تسجيل الدخول' : 'Se connecter'}
      </h2>
      <form>
        <InputEmail />
        <InputPassword text={isArabic ? 'كلمة المرور' : 'Mot de passe'}/>
        <div className="text-right text-green-700 mb-4">
          <a href="/ForgotPassword">
            {isArabic ? 'نسيت كلمة المرور' : 'Mot de passe oublié'}
          </a>
        </div>
        <ButtonConfirm text={isArabic ? 'تسجيل الدخول' : 'Se connecter'} />
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          {isArabic ? 'ليس لدي حساب؟' : "Je n'ai pas un compte ?"}{' '}
          <Link to="/signUp" className="text-green-600">
            {isArabic ? 'إنشاء حساب' : 'Créer un compte'}
          </Link>
        </p>
      </div>
    </div>
  )
};

export default LoginForm;
