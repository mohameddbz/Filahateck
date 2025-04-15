import React, { useState ,useContext} from 'react';
import { LanguageContext } from './../../context/LanguageContext';
import analyseSol from './../../assets/user/analyseduSol.png'; 
import forage from './../../assets/user/forage.png';

const ServicesOffert = () => {

    const { isArabic } = useContext(LanguageContext);
    const lang = isArabic ? 'arabic' : 'french';
  // État pour suivre quel service est sélectionné/affiché en détail
  const [selectedService, setSelectedService] = useState(null);
  // État pour contrôler l'affichage du formulaire
  const [showForm, setShowForm] = useState(false);
  
  // Exemple de données de services
  const services = [
    {
      id: 1,
      name: "Analyse de sol",
      nameARABE: "تحليل التربة",
      image: analyseSol,
      descriptionARABE : "تقدم USTHB Expertise and Engineering حلولًا مبتكرة لتحسين إدارة الموارد الطبيعية وتعزيز الإنتاجية الزراعية، وذلك باستخدام معدات متطورة",
      description: "USTHB Expertise and Engineering propose des solutions innovantes pour optimiser la gestion des ressources naturelles et améliorer la productivité agricole. Grâce à des équipements de pointe",
      details: [
        "Analyse propriétés physiques d'un sol agricole pH, conductivité, humidité",
        "Analyse minéralogique  d'un sol agricole par DRX/FRX",
      ],
      detailsARABE: [
        "تحليل الخصائص الفيزيائية للتربة الزراعية: التوصيلية، الرطوبة",
       " DRX/FRX تحليل معدني للتربة الزراعية باستخدام ",
      ],
      price: "À partir de 100€"
    },
    {
      id: 2,
      name: "Forage",
      nameARABE: "حفر",
      image: forage,
      descriptionARABE : "تقدم USTHB Expertise and Engineering حلولًا مبتكرة لتحسين إدارة الموارد الطبيعية وتعزيز الإنتاجية الزراعية، وذلك باستخدام معدات متطورة",
      description: "USTHB Expertise and Engineering propose des solutions innovantes pour optimiser la gestion des ressources naturelles et améliorer la productivité agricole. Grâce à des équipements de pointe",
      details: [
        "Étude des sols et du sous-sol (cartographie, analyse de la salinité, prospection électrique et magnétique).",
        "Détection des ressources en eau (nappes phréatiques, aquifères profonds)",
        "Analyse des risques (érosion, sécheresse, contamination)",
        "Cartographie précise avec DGPS (gestion optimisée des cultures)"
      ],
      detailsARABE: [
        "دراسة التربة وتحت التربة (رسم الخرائط، تحليل الملوحة، الاستكشاف الكهربائي والمغناطيسي)",
        "الكشف عن الموارد المائية (المياه الجوفية السطحية، الطبقات المائية العميقة)",
        "تحليل المخاطر (التعرية، الجفاف، التلوث)",
        "رسم خرائط دقيقة باستخدام DGPS (إدارة محسّنة للمحاصيل)"
      ],
      price: "À partir de 150€"
    }
  ];

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de traitement du formulaire ici
    alert("Formulaire soumis avec succès!");
    setShowForm(false);
    setSelectedService(null);
  };

  // Composant pour le formulaire de demande de service
  const ServiceForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-2xl font-bold mb-4 text-darkBlue">Demande de service: {services[selectedService-1].name}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
            <input type="text" id="name" name="name" required
              className="mt-1 block w-full border border-myGrayy rounded-md shadow-sm p-2" />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" required
              className="mt-1 block w-full border border-myGrayy rounded-md shadow-sm p-2" />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input type="tel" id="phone" name="phone" required
              className="mt-1 block w-full border border-myGrayy rounded-md shadow-sm p-2" />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" name="message" rows="4" required
              className="mt-1 block w-full border border-myGrayy rounded-md shadow-sm p-2"></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-myGrayy text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-myGreen text-white rounded-md hover:bg-opacity-90 transition"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  // Vue des cartes normales (état initial)
  const ServiceCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {services.map((service) => (
        <div 
          key={service.id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
          onClick={() => setSelectedService(service.id)}
        >
          <div className="relative h-48">
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/400x200?text=${service.name}`;
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold text-myOrange">{ isArabic ? service.nameARABE : service.name}</h3>
            <button 
              className="mt-2 px-4 py-2 bg-whiteBlue text-white rounded-md hover:bg-darkBlue transition"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedService(service.id);
              }}
            >
              Afficher les détails
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Vue détaillée d'un service
  const ServiceDetail = () => {
    // -1 car les IDs commencent à 1 mais les indices de tableau à 0
    const service = services[selectedService-1];
    
    return (
      <div className={`w-full h-full overflow-y-auto p-4 md:p-8  ${isArabic ? 'text-right' : 'text-left'}`}>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-80">
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/800x400?text=${service.name}`;
              }}
            />
            <button 
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              onClick={() => setSelectedService(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-bold text-myOrange mb-4">{service.name}</h2>
            
            <div className="bg-myOrange-10 p-4 rounded-lg mb-6">
              <p className="text-lg">{ isArabic ? service.descriptionARABE : service.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-darkBlue mb-3">{isArabic ? 'خدماتنا' : 'Nos services'}</h3>
                                <ul className={`space-y-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                    {(Array.isArray(isArabic ? service.detailsARABE : service.details) ? 
                        (isArabic ? service.detailsARABE : service.details) : []
                    ).map((detail, index) => (
                        <li key={index} className="">
                       {!isArabic && <span className="text-myGreen mr-2">✓</span>}  
                        <span>{detail}</span>
                        {isArabic && <span className="text-myGreen ml-2">✓</span>}  

                        </li>
                    ))}
                    </ul>
            </div>
            
            <div className="bg-backgroundComment p-4 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-myOrange">{isArabic ? 'اتصل بنا' : 'Nous Contacter'}</h3>
              <p className="text-lg mb-3">{isArabic ?'للاستفادة من هذه الخدمة، يرجى الاتصال بنا عبر' : 'Pour profiter de ce service, veuillez nous contacter via '}</p>
              
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
                 {isArabic ? 'صفحتنا على فيسبوك' :'Notre page Facebook'}   
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
            
            
            {/* <div className="text-center">
              <button 
                className="px-6 py-3 bg-myGreen text-white rounded-md hover:bg-opacity-90 transition text-lg font-medium"
                onClick={() => setShowForm(true)}
              >
                Demander ce service
              </button>
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen mt-6 mx-4">
      {/* Titre de la page */}
      <div className="bg-darkBlue text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">Nos Services</h1>
        </div>
      </div>
      
      {/* Contenu principal - adapté pour coexister avec la sidebar */}
      <div className="container mx-auto py-2">
        {selectedService === null ? (
          <ServiceCards />
        ) : (
          <ServiceDetail />
        )}
      </div>
      
      {/* Formulaire (affiché conditionnellement) */}
      {showForm && <ServiceForm />}
    </div>
  );
};

export default ServicesOffert;