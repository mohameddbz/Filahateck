import { useState ,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from './../../../../context/LanguageContext';

export default function SubscriptionPage() {
    const { isArabic } = useContext(LanguageContext);
    const language = isArabic ? 'arabic' : 'french';
    const [redirecting, setRedirecting] = useState(false);
    const navigate = useNavigate();

  // Text content for different languages
  const content = {
    french: {
      title: "Accès Restreint",
      message: "Vous devez avoir un abonnement pour accéder à cette page.",
      buttonText: "S'abonner maintenant",
      redirectingText: "Redirection...",
      accountQuestion: "Vous avez déjà un compte?",
      signIn: "Se connecter",
      alertMessage: "Redirection vers la page d'abonnement..."
    },
    arabic: {
      title: "وصول مقيد",
      message: "يجب أن يكون لديك اشتراك للوصول إلى هذه الصفحة.",
      buttonText: "اشترك الآن",
      redirectingText: "جاري التحويل...",
      accountQuestion: "هل لديك حساب بالفعل؟",
      signIn: "تسجيل الدخول",
      alertMessage: "جاري التحويل إلى صفحة الاشتراك..."
    }
  };
  
  const handleRedirect = () => {
    navigate("/user/Abonnement")
  };
  
  // Determine text direction based on language
  const isRTL = language === 'arabic';
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Language switcher */}
      <div className={`bg-white p-8 rounded-lg shadow-md max-w-md w-full ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-center mb-6">
          <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V6a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h6a3 3 0 003-3z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {content[language].title}
        </h2>
        
        <p className="text-center text-gray-600 mb-6">
          {content[language].message}
        </p>
        
        <button
          onClick={handleRedirect}
          disabled={redirecting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {redirecting ? (
            <span className="flex items-center justify-center">
              <svg className={`animate-spin h-4 w-4 text-white ${isRTL ? 'ml-2 -mr-1' : '-ml-1 mr-2'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {content[language].redirectingText}
            </span>
          ) : (
            content[language].buttonText
          )}
        </button>
      </div>
    </div>
  );
}