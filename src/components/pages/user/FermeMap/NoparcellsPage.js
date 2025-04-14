import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../../context/LanguageContext';

export default function NoParcelles() {
  const { isArabic } = useContext(LanguageContext);
  const language = isArabic ? 'arabic' : 'french';
  const navigate = useNavigate();

  // Text content for different languages
  const content = {
    french: {
      title: "Aucune parcelle trouvée",
      message: "Vous n'avez pas encore de parcelles enregistrées. Veuillez contacter un responsable pour ajouter vos parcelles.",
      helpText: "Besoin d'aide? Contactez notre service client:",
      buttonText: "Mes Parcelles",
      orText: "Ou",
      contactText: "contacter un responsable",
      supportText: "pour ajouter vos parcelles"
    },
    arabic: {
      title: "لم يتم العثور على قطع الأراضي",
      message: "ليس لديك قطع أراضي مسجلة حتى الآن. يرجى التواصل مع المسؤول لإضافة قطع الأراضي الخاصة بك.",
      helpText: "بحاجة إلى مساعدة؟ اتصل بخدمة العملاء:",
      buttonText: "قطع أراضي الخاصة بي",
      orText: "أو",
      contactText: "تواصل مع المسؤول",
      supportText: "لإضافة قطع الأراضي الخاصة بك"
    }
  };

  const handleRedirect = () => {
    navigate("/user/Parcelles");
  };

  // Determine text direction based on language
  const isRTL = language === 'arabic';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className={`bg-white p-8 rounded-lg shadow-md max-w-md w-full ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 bg-amber-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
       
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {content[language].title}
        </h2>
       
        <div className={`bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 ${isRTL ? 'border-r-4 border-l-0' : ''}`}>
          <p className="text-amber-700">
            {content[language].message}
          </p>
        </div>
       
        <div className="mb-6">
            <div className="bg-backgroundComment p-2 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-3 text-myOrange">{isArabic ? 'اتصل بنا' : 'Nous Contacter'}</h3>

              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <a 
                  href="https://web.facebook.com/profile.php?id=61566851033301" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                 {isArabic ? 'صفحتنا فيسبوك' :'Page Facebook'}   
                </a>
                
                <a 
                  href="https://wa.me/+213794643897" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  0794643897
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}