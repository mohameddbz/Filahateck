import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Sprout, TrendingUp, Globe, Lightbulb } from 'lucide-react';
import { LanguageContext } from './../../../context/LanguageContext';

export default function AboutPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('vision');
  const { isArabic } = useContext(LanguageContext);
  console.log(isArabic)
  // Contenu en français
  const tabsFrench = {
    vision: {
      icon: <Lightbulb size={24} />,
      title: "Notre Vision",
      content: "Chez FilahaTech, nous croyons en un avenir où l'agriculture et la technologie travaillent main dans la main pour créer un secteur agricole plus productif, plus rentable et plus durable. Notre mission est d'accompagner les agriculteurs dans leur transition vers une agriculture intelligente, en leur fournissant des outils numériques accessibles et adaptés à leurs besoins spécifiques."
    },
    history: {
      icon: <TrendingUp size={24} />,
      title: "Notre Histoire",
      content: "FilahaTech est née d'une vision commune : celle de révolutionner le secteur agricole grâce à l'innovation technologique. En observant les défis auxquels font face les agriculteurs aujourd'hui - changement climatique, gestion des ressources, productivité, rentabilité - nous avons compris qu'il était temps d'apporter des solutions concrètes et accessibles. Notre plateforme d'agriculture numérique a été conçue par des experts passionnés, combinant expertise agronomique et maîtrise technologique pour offrir des solutions qui font vraiment la différence sur le terrain."
    },
    team: {
      icon: <Users size={24} />,
      title: "Notre Équipe",
      content: "",
      isTeam: true
    },
    values: {
      icon: <Sprout size={24} />,
      title: "Nos Valeurs",
      content: "",
      isValues: true
    }
  };

  // Contenu en arabe
  const tabsArabic = {
    vision: {
      icon: <Lightbulb size={24} />,
      title: "رؤيتنا",
      content: "في فلاحة تك، نؤمن بمستقبل تعمل فيه الزراعة والتكنولوجيا جنبًا إلى جنب لخلق قطاع زراعي أكثر إنتاجية واستدامة وربحية. مهمتنا هي مرافقة المزارعين في انتقالهم نحو الزراعة الذكية، من خلال تزويدهم بأدوات رقمية سهلة الوصول ومكيفة مع احتياجاتهم الخاصة."
    },
    history: {
      icon: <TrendingUp size={24} />,
      title: "قصتنا",
      content: "ولدت فلاحة تك من رؤية مشتركة: إحداث ثورة في القطاع الزراعي من خلال الابتكار التكنولوجي. من خلال ملاحظة التحديات التي يواجهها المزارعون اليوم - تغير المناخ، وإدارة الموارد، والإنتاجية، والربحية - فهمنا أنه حان الوقت لتقديم حلول ملموسة وسهلة الوصول. تم تصميم منصتنا الزراعية الرقمية من قبل خبراء متحمسين، يجمعون بين الخبرة الزراعية والإتقان التكنولوجي لتقديم حلول تحدث فرقًا حقيقيًا على أرض الواقع."
    },
    team: {
      icon: <Users size={24} />,
      title: "فريقنا",
      content: "",
      isTeam: true
    },
    values: {
      icon: <Sprout size={24} />,
      title: "قيمنا",
      content: "",
      isValues: true
    }
  };

  // Sélection des onglets selon la langue
  const tabs = isArabic ? tabsArabic : tabsFrench;

  // Membres de l'équipe en français
  const teamMembersFrench = [
    {
      name: "DABOUZ Mohamed Amine",
      title: "Fondateur & Directeur Technique",
      bio: "Mohamed Amine est l'architecte technique derrière FilahaTech. Avec une solide formation en informatique et une passion pour l'agriculture durable, il dirige le développement de nos solutions innovantes. Son expertise en intelligence artificielle et en analyse de données permet à notre plateforme d'offrir des recommandations précises et personnalisées à chaque agriculteur.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "BOUCENNA Oussama",
      title: "Co-fondateur & Responsable Agronomique",
      bio: "Oussama apporte son expertise agronomique approfondie à notre équipe. Ingénieur agronome de formation, il comprend parfaitement les défis quotidiens des agriculteurs. Il veille à ce que nos solutions technologiques répondent aux besoins réels du terrain et travaille en étroite collaboration avec notre communauté d'agriculteurs pour améliorer constamment nos services.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "ELHAKAOUI Marwa",
      title: "Responsable Marketing & Relations Client",
      bio: "Marwa est chargée de faire connaître FilahaTech et d'assurer une communication efficace avec notre communauté d'utilisateurs. Son expertise en marketing digital et sa compréhension du secteur agricole lui permettent de créer des ponts entre notre technologie et ceux qui en bénéficient. Elle travaille chaque jour pour que FilahaTech soit accessible au plus grand nombre d'agriculteurs.",
      image: "/api/placeholder/200/200"
    }
  ];

  // Membres de l'équipe en arabe
  const teamMembersArabic = [
    {
      name: "دبوز محمد أمين",
      title: "المؤسس ومدير التكنولوجيا",
      bio: "محمد أمين هو المهندس التقني وراء فلاحة تك. بفضل تكوينه القوي في مجال المعلوماتية وشغفه بالزراعة المستدامة، يقود تطوير حلولنا المبتكرة. تتيح خبرته في الذكاء الاصطناعي وتحليل البيانات لمنصتنا تقديم توصيات دقيقة ومخصصة لكل مزارع.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "بوسنة أسامة",
      title: "شريك مؤسس ومسؤول زراعي",
      bio: "يجلب أسامة خبرته الزراعية العميقة لفريقنا. كمهندس زراعي بالتكوين، يفهم تمامًا التحديات اليومية للمزارعين. يضمن أن تلبي حلولنا التكنولوجية الاحتياجات الحقيقية في الميدان ويعمل بشكل وثيق مع مجتمع المزارعين لدينا لتحسين خدماتنا باستمرار.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "الحكاوي مروة",
      title: "مسؤولة التسويق وعلاقات العملاء",
      bio: "مروة مسؤولة عن التعريف بـفلاحة تك وضمان التواصل الفعال مع مجتمع المستخدمين لدينا. تتيح لها خبرتها في التسويق الرقمي وفهمها للقطاع الزراعي بناء جسور بين تكنولوجيتنا والمستفيدين منها. تعمل كل يوم لجعل فلاحة تك في متناول أكبر عدد ممكن من المزارعين.",
      image: "/api/placeholder/200/200"
    }
  ];

  // Sélection des membres de l'équipe selon la langue
  const teamMembers = isArabic ? teamMembersArabic : teamMembersFrench;

  // Valeurs en français
  const valuesFrench = [
    {
      icon: <Sprout size={48} className="text-green-600" />,
      title: "Durabilité",
      description: "Nous promouvons des pratiques agricoles qui respectent l'environnement et préservent les ressources pour les générations futures."
    },
    {
      icon: <TrendingUp size={48} className="text-green-600" />,
      title: "Innovation",
      description: "Nous repoussons constamment les limites de ce qui est possible en agriculture grâce aux dernières avancées technologiques."
    },
    {
      icon: <Users size={48} className="text-green-600" />,
      title: "Communauté",
      description: "Nous croyons en la force de la collaboration et du partage des connaissances entre tous les acteurs du secteur agricole."
    },
    {
      icon: <Globe size={48} className="text-green-600" />,
      title: "Impact",
      description: "Nous nous engageons à créer des solutions qui ont un impact positif concret sur les agriculteurs et sur notre planète."
    }
  ];

  // Valeurs en arabe
  const valuesArabic = [
    {
      icon: <Sprout size={48} className="text-green-600" />,
      title: "الاستدامة",
      description: "نحن نروج للممارسات الزراعية التي تحترم البيئة وتحافظ على الموارد للأجيال القادمة."
    },
    {
      icon: <TrendingUp size={48} className="text-green-600" />,
      title: "الابتكار",
      description: "نحن نتحدى باستمرار حدود ما هو ممكن في الزراعة من خلال أحدث التطورات التكنولوجية."
    },
    {
      icon: <Users size={48} className="text-green-600" />,
      title: "المجتمع",
      description: "نحن نؤمن بقوة التعاون وتبادل المعرفة بين جميع الفاعلين في القطاع الزراعي."
    },
    {
      icon: <Globe size={48} className="text-green-600" />,
      title: "التأثير",
      description: "نحن ملتزمون بإنشاء حلول لها تأثير إيجابي ملموس على المزارعين وعلى كوكبنا."
    }
  ];

  // Sélection des valeurs selon la langue
  const values = isArabic ? valuesArabic : valuesFrench;

  return (
    <div className={`min-h-screen ${isArabic ? 'rtl' : 'ltr'}`}>
      {/* Hero Section - Updated with more dynamic background */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-28 px-4">

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6 drop-shadow-md">
            {isArabic ? "حول فلاحة تك" : "À propos de FilahaTech"}
          </h1>
          <p className="text-xl max-w-3xl mx-auto font-light leading-relaxed">
            {isArabic 
              ? "اكتشف الفريق وراء فلاحة تك ومهمتنا في تحويل الزراعة من خلال الابتكار التكنولوجي من أجل مستقبل أكثر استدامة."
              : "Découvrez l'équipe derrière FilahaTech et notre mission de transformer l'agriculture grâce à l'innovation technologique pour un futur plus durable."}
          </p>
        </div>
      </div>

      {/* Main Content - Enhanced layout */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* Tabs - Updated with animated underline */}
        <div className="flex flex-wrap justify-center mb-16">
          {Object.entries(tabs).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center mx-6 py-4 px-2 text-lg font-medium border-b-2 transition-all duration-300 ${
                activeTab === key
                  ? 'text-green-600 border-green-600'
                  : 'text-gray-500 border-transparent hover:text-green-500 hover:border-green-300'
              }`}
            >
              <span className={`${isArabic ? 'ml-3' : 'mr-3'} ${activeTab === key ? 'text-green-600' : 'text-gray-400'}`}>
                {tab.icon}
              </span>
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content - Improved styling */}
        <div className="mb-24">
          {!tabs[activeTab].isTeam && !tabs[activeTab].isValues ? (
            <div className="prose max-w-none bg-white rounded-xl shadow-lg p-10 border-t-4 border-green-500">
              <p className="text-xl text-gray-700 leading-relaxed">
                {tabs[activeTab].content}
              </p>
            </div>
          ) : tabs[activeTab].isTeam ? (
            <div className="grid md:grid-cols-3 gap-10 mt-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-green-800 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8 border-t-4 border-green-500">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-green-600 font-medium mb-5">{member.title}</p>
                    <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div 
                    key={index} 
                    className="text-center p-8 bg-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 border-green-500 group"
                  >
                    <div className="flex justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110">
                      <div className="bg-green-50 p-4 rounded-full">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action - Redesigned with better gradient */}
        <div className="mt-24 rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative bg-gradient-to-r from-green-800 via-green-600 to-green-700 p-12 text-center text-white">
            <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
            <h2 className="text-4xl font-bold mb-6">
              {isArabic ? "انضم إلينا في مهمتنا" : "Rejoignez-nous dans notre mission"}
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              {isArabic 
                ? "معًا، يمكننا تحويل الزراعة وبناء مستقبل أكثر استدامة. اكتشف كيف يمكن لحلولنا مساعدتك على النجاح."
                : "Ensemble, nous pouvons transformer l'agriculture et construire un avenir plus durable. Découvrez comment nos solutions peuvent vous aider à réussir."}
            </p>
            <button 
              onClick={() => navigate('/auth/SignUp')} 
              className="bg-white text-green-700 hover:bg-green-50 font-bold py-4 px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              {isArabic ? "انضم إلينا" : "Rejoignez-nous"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}