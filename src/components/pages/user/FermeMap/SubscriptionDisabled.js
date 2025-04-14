import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from './../../../../context/LanguageContext';

export default function SubscriptionDisabled() {
  const { isArabic } = useContext(LanguageContext);
  const language = isArabic ? 'arabic' : 'french';
  const navigate = useNavigate();

  // Text content for different languages
  const content = {
    french: {
      title: "Abonnement désactivé",
      message: "Votre abonnement est désactivé. Veuillez devrez paye pour accéder à cette fonctionnalité.",
      helpText: "Besoin d'aide? Contactez notre service client:",
      buttonText: "Mon Abonnement",
      orText: "Ou",
      contactText: "contacter notre équipe",
      supportText: "pour une assistance personnalisée"
    },
    arabic: {
      title: "الاشتراك معطل",
      message: "اشتراكك معطل. يجب عليك الدفع للوصول إلى هذه الميزة.",
      helpText: "بحاجة إلى مساعدة؟ اتصل بخدمة العملاء:",
      buttonText: "اشتراكي",
      orText: "أو",
      contactText: "اتصل بفريقنا",
      supportText: "للحصول على مساعدة مخصصة"
    }
  };

  const handleRedirect = () => {
    navigate("/user/Abonnement");
  };

  // Determine text direction based on language
  const isRTL = language === 'arabic';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className={`bg-white p-8 rounded-lg shadow-md max-w-md w-full ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 bg-red-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
       
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {content[language].title}
        </h2>
       
        <div className={`bg-red-50 border-l-4 border-red-500 p-4 mb-6 ${isRTL ? 'border-r-4 border-l-0' : ''}`}>
          <p className="text-red-700">
            {content[language].message}
          </p>
        </div>
       
        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p className="text-gray-700 mb-2">
              {content[language].helpText}
            </p>
            <a
              href="tel:+213794643897"
              className={`flex items-center text-blue-600 font-medium hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +213 794 64 38 97
            </a>
          </div>
        </div>
       
        <button
          onClick={handleRedirect}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          {content[language].buttonText}
        </button>
       
      </div>
    </div>
  );
}