import React, { useState, useEffect ,useContext } from 'react';
import {translations} from '../../utils/constant/CommingSoonS';
import { LanguageContext } from '../../context/LanguageContext';


const ComingSoonBanner = () => {
  const { isArabic } = useContext(LanguageContext);
     const lang = isArabic ? 'arabic' : 'french';
 const texts = translations[lang];
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [contactMethod, setContactMethod] = useState('email'); // 'email', 'phone', ou 'both'
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
 
  // Date de lancement (exemple: 30 jours à partir de maintenant)
  const launchDate = new Date(2025, 3, 12);
  launchDate.setDate(launchDate.getDate());
 
  useEffect(() => {
    // Vérifier si l'utilisateur s'est déjà inscrit
    const userSubscribed = localStorage.getItem('userSubscribed');
    if (userSubscribed === 'true') {
      setSubscribed(true);
    }
   
    // Charger le script EmailJS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    document.body.appendChild(script);
   
    script.onload = () => {
      window.emailjs.init("xq1qLciHgnktYRiN1"); // Remplacez par votre clé publique EmailJS
    };
   
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
     
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
     
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
     
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
   
    return () => {
      clearInterval(timer);
      document.body.removeChild(script);
    };
  }, []);
 
  const sendEmail = async () => {
    if (!window.emailjs) {
      console.error("EmailJS not loaded");
      return false;
    }
   
    try {
      const result = await window.emailjs.send(
        "service_jnfowwl", // Remplacez par votre Service ID EmailJS
        "template_pla39yo", // Remplacez par votre Template ID EmailJS
        {
            // filahatech.pro@gmail.com
          to_email: "filahatech.pro@gmail.com", // Remplacez par votre adresse email
          from_email: contactInfo.email || 'N/A',
          phone: contactInfo.phone || 'N/A',
          message: `Nouvel abonné à la notification de lancement : 
          ${contactInfo.email ? 'Email: ' + contactInfo.email : ''} 
          ${contactInfo.phone ? 'Téléphone: ' + contactInfo.phone : ''} 
          - Date: ${new Date().toLocaleString()}`
        }
      );
     
      console.log("Email envoyé avec succès:", result.text);
      return true;
    } catch (error) {
      console.error("Erreur d'envoi d'email:", error);
      return false;
    }
  };

  const validateInfo = () => {
    if (contactMethod === 'email' || contactMethod === 'both') {
      if (!contactInfo.email || !contactInfo.email.includes('@') || !contactInfo.email.includes('.')) {
        alert('Veuillez entrer une adresse email valide');
        return false;
      }
    }
    
    if (contactMethod === 'phone' || contactMethod === 'both') {
      if (!contactInfo.phone || contactInfo.phone.length < 8) {
        alert('Veuillez entrer un numéro de téléphone valide');
        return false;
      }
    }
    
    return true;
  };
 
  const handleSubscribe = async () => {
    if (!validateInfo()) return;
    
    setLoading(true);
   
    // Envoyer l'email via EmailJS
    const success = await sendEmail();
   
    if (success) {
      // Sauvegarder l'état d'inscription
      localStorage.setItem('userSubscribed', 'true');
      setSubscribed(true);
     
      // Sauvegarder localement aussi comme backup
      const storedContacts = localStorage.getItem('comingSoonContacts');
      const contacts = storedContacts ? JSON.parse(storedContacts) : [];
      const updatedContacts = [...contacts, { 
        email: contactInfo.email, 
        phone: contactInfo.phone,
        timestamp: new Date().toISOString() 
      }];
      localStorage.setItem('comingSoonContacts', JSON.stringify(updatedContacts));
    } else {
      alert("Désolé, nous n'avons pas pu enregistrer vos informations. Veuillez réessayer plus tard.");
    }
   
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    });
  };
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-SidebarColor">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Bannière supérieure */}
        <div className="bg-darkBlue p-4 text-white text-center">
          <h2 className="text-2xl font-bold">{texts.title}</h2>
        </div>
        
        {/* Contenu principal */}
        <div className="p-6">
          <p className="text-center text-myOrange mb-6 font-medium">{texts.subTitle}</p>
          
          {/* Compteur */}
          <div className="flex justify-center space-x-3 mb-8">
            <div className="border-2 border-myYellow p-3 rounded-xl text-center w-16 shadow">
              <div className="text-2xl font-bold text-darkBlue">{countdown.days}</div>
              <div className="text-xs text-darkBlue">{texts.date}</div>
            </div>
            <div className="border-2 border-myYellow p-3 rounded-xl text-center w-16 shadow">
              <div className="text-2xl font-bold text-darkBlue">{countdown.hours}</div>
              <div className="text-xs text-darkBlue">{texts.hours}</div>
            </div>
            <div className="border-2 border-myYellow p-3 rounded-xl text-center w-16 shadow">
              <div className="text-2xl font-bold text-darkBlue">{countdown.minutes}</div>
              <div className="text-xs text-darkBlue">{texts.minutes}</div>
            </div>
            <div className="border-2 border-myYellow p-3 rounded-xl text-center w-16 shadow">
              <div className="text-2xl font-bold text-darkBlue">{countdown.seconds}</div>
              <div className="text-xs text-darkBlue">{texts.Secondes}</div>
            </div>
          </div>
          
          {/* Formulaire d'inscription */}
          {!subscribed ? (
            <div className=" p-4 rounded-lg">
              <div className="mb-4">
                <div className="flex justify-center space-x-2 mb-4">
                  <button 
                    className={`px-3 py-2 rounded-lg text-sm transition duration-300 ${contactMethod === 'email' ? 'bg-darkBlue text-white font-bold' : 'bg-white text-darkBlue border border-darkBlue'}`}
                    onClick={() => setContactMethod('email')}
                  >
                    Email
                  </button>
                  <button 
                    className={`px-3 py-2 rounded-lg text-sm transition duration-300 ${contactMethod === 'phone' ? 'bg-darkBlue text-white font-bold' : 'bg-white text-darkBlue border border-darkBlue'}`}
                    onClick={() => setContactMethod('phone')}
                  >
                    Téléphone
                  </button>
                  <button 
                    className={`px-3 py-2 rounded-lg text-sm transition duration-300 ${contactMethod === 'both' ? 'bg-darkBlue text-white font-bold' : 'bg-white text-darkBlue border border-darkBlue'}`}
                    onClick={() => setContactMethod('both')}
                  >
                    Les deux
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {(contactMethod === 'email' || contactMethod === 'both') && (
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Votre adresse e-mail"
                      className="w-full p-3 rounded-xl text-darkBlue border border-whiteBlue focus:outline-none focus:ring-2 focus:ring-darkBlue"
                      value={contactInfo.email}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                )}
                
                {(contactMethod === 'phone' || contactMethod === 'both') && (
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Votre numéro de téléphone"
                      className="w-full p-3 rounded-xl text-darkBlue border border-whiteBlue focus:outline-none focus:ring-2 focus:ring-darkBlue"
                      value={contactInfo.phone}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                )}
                
                <button
                  className={`bg-myOrange hover:bg-myGreen text-white font-bold py-3 px-6 rounded-xl transition duration-300 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  {loading ? 'Envoi...' : texts.notifyMe }
                </button>
              </div>
              
              <p className="text-sm mt-3  text-myOrange p-2 rounded-xl text-center">
               {texts.note}
              </p>
            </div>
          ) : (
            <div className="bg-myGreen p-4 rounded-xl text-white text-center">
              <p className="font-bold">{texts.thanks}</p>
              <p className="text-sm">{texts.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonBanner;