import ButtonLang from "../../components/common/Button/ButtonLang";
import Header from "../../components/layout/Header";
import React, { useContext, useRef } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

import imagExploitation from '../../images/services/exploitation.png';
import imagPrecission from '../../images/services/agriculturePrecision.png';
import imagProduction from '../../images/services/productionVegetal.png';
import ServiceCard from "../../components/ui/HomePage/ServiceCard";

import  agreculteur from "../../images/solutions/agreculteur.png"
import chambre from "../../images/solutions/Chambre Nationale d’agriculture.png"
import coopertaive from "../../images/solutions/Coopérative agricole.png"
import distributeur from "../../images/solutions/Distributeurs d’intrants agricoles.png"
import fournisseur  from "../../images/solutions/Fournisseurs de mtériel agricole.png"
import financier from "../../images/solutions/Fournisseurs de mtériel agricole.png"
import SolutionCard from "../../components/ui/HomePage/SolutionCard";
import CommentCard from "../../components/ui/HomePage/CommentCard";
import comments from "../../data/commentsData";
import Footer from "../../components/common/Footer";

// Liste des services
const services = [
    {
         "nomFr": "Gestion d’exploitation", 
          "descriptionFr":"Filahatech révolutionne la gestion des stocks et la commercialisation des récoltes pour votre exploitation agricole. Grâce à nos modules innovants vous bénéficiez de:" ,
          "imageService" : imagExploitation,
    },
    {
        "nomFr": "Agriculture de précision", 
          "descriptionFr":"Un concept de gestion de l'agriculture moderne qui utilise des techniques numériques pour contrôler et optimiser les processus de production agricole." ,
          "imageService" : imagPrecission,
    },
    {
        "nomFr": "Production végétale", 
        "descriptionFr":"La quantité de produits végétaux obtenue par unité de surface récoltée." ,
        "imageService" : imagProduction,
    }
];

const solutions = [
    {
        "nomFr" : "Agriculteur" ,
        "imageSolution":agreculteur, 
    },

    {
        "nomFr" : "Coopérative agricole" ,
        "imageSolution":coopertaive, 
    },

    {
        "nomFr" : "Distributeurs d’intrants agricoles" ,
        "imageSolution":distributeur, 
    },

    {
        "nomFr" : "Chambre Nationale d’agriculture" ,
        "imageSolution":chambre, 
    },

    {
        "nomFr" : "Fournisseurs de matériel agricole" ,
        "imageSolution":fournisseur, 
    },

    {
        "nomFr" : "Service financier" ,
        "imageSolution":financier, 
    },
   
]

const HomePage = () => {
    const { isArabic } = useContext(LanguageContext);
    const scrollRef = useRef(null);
    const scrollRefComments = useRef(null)
    let isDraggingComment = false;
    let startXComment ;
    let scrollLeftComment ;
    let isDragging = false;
    let startX ;
    let scrollLeft ;

    const startDraggingComment = (e) => {
        isDraggingComment = true;
        startXComment = e.pageX - scrollRefComments.current.offsetLeft; // Correction ici
        scrollLeftComment = scrollRefComments.current.scrollLeft; // Correction ici
    };
    
    const handleMouseMoveComment = (e) => {
        if (!isDraggingComment) return;
        e.preventDefault();
        const x = e.pageX - scrollRefComments.current.offsetLeft;
        const walk = (x - startXComment) * 2; // Ajuste la vitesse de défilement
        scrollRefComments.current.scrollLeft = scrollLeftComment - walk; // Correction ici
    };

    const startDragging = (e) => {
        isDragging = true;
        startX = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft = scrollRef.current.scrollLeft;
    };
    
    const stopDraggingComment = () => {
        isDraggingComment = false;
    };

    const stopDragging = () => {
        isDragging = false;
    };

    

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Ajuste la vitesse de défilement
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div>
            <Header />
            <ButtonLang />
            <main>
               <section className="bg-my-image  flex justify-center items-center  h-[400px] bg-center bg-cover">
               <div className="w-full text-white  px-10 text-shadow">
                <p className="text-5xl font-bold ">FilahaTech pour un Futur Durable</p>
                <p className="text-2xl">Découvrez comment la technologie révolutionne l'agriculture ! Notre plateforme
                    FilahaTech d'agriculture numérique vous accompagne pour optimiser la gestion de
                    votre exploitation, améliorer les rendements, et adopter des pratiques durables.
                    Ensemble, cultivons un avenir plus vert et plus intelligent.</p>
               </div>
               </section>
               <br/>
               <br/>

                <section className="flex-col justify-center items-center">
                    <div className="mx-auto text-center text-2xl max-w-3xl">
                        <h1 className="my-4 font-semibold text-4xl text-myOrange">
                            {isArabic ? 'خدماتنا' : 'Nos services'}
                        </h1>
                        <p>
                            {isArabic
                                ? 'استكشف حلولنا المبتكرة التي تُحدث تحولًا في زراعتك. اكتشف كيف يمكننا تبسيط حياتك اليومية وتعزيز أدائك'
                                : 'Explorez nos solutions innovantes qui transforment votre agriculture. Découvrez comment nous pouvons simplifier votre quotidien et booster vos performances !'}
                        </p>
                    </div>
                   <br/>
                    <div
                        ref={scrollRef}
                        onMouseDown={startDragging}
                        onMouseLeave={stopDragging}
                        onMouseUp={stopDragging}
                        onMouseMove={handleMouseMove}
                        className="flex overflow-x-auto space-x-8 p-4  mx-5 scrollbar-hide cursor-pointer"
                    >
                        {services.map((serviceCard, index) => (
                            <ServiceCard
                                key={index}
                                title={serviceCard.nomFr}
                                description={serviceCard.descriptionFr}
                                image={serviceCard.imageService}
                            />
                        ))}
                    </div>
                </section>

               
                <hr  className="my-20  mx-auto w-2/4" />
               

                <section>
                <div className="mx-auto text-center text-2xl max-w-3xl">
                        <h1 className="my-4 font-semibold text-4xl text-myOrange">
                            {isArabic ? 'حلول فيلاتيك مصممة من أجلك' : 'Les  solutions de FilahaTech sont pour vous'}
                        </h1>
                        <p>
                            {isArabic
                                ? 'إذا كنت ...'
                                : 'si vous êtes ...'}
                        </p>
                 </div>
                 <div className="grid grid-cols-1 w-fit sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10  mx-auto  my-10 mb-0 ">
                      {solutions && solutions.map((solutionCard)=> {
                        return  <SolutionCard title={solutionCard.nomFr} image={solutionCard.imageSolution}/>
                      } )}   
                 </div>
                </section>
                <hr  className="my-20  mx-auto w-2/4" />
                <section className="flex-col justify-center items-center">
                    <div className="mx-auto text-center text-2xl max-w-3xl">
                        <h1 className="my-4 font-semibold text-4xl text-myOrange">
                            {isArabic ? 'آراء عملائنا' : 'Avis de nos clients'}
                        </h1>
                        <p>
                            {isArabic
                                ? 'اكتشف ما يقوله عملائنا عن حلولنا وكيف غيرت حياتهم الزراعية'
                                : 'Découvrez ce que nos clients disent de nos solutions et comment elles ont transformé leur quotidien agricole.'}
                        </p>
                    </div>
                   <br/>
                    <div
                        ref={scrollRefComments}
                        onMouseDown={startDraggingComment}
                        onMouseLeave={stopDraggingComment}
                        onMouseUp={stopDraggingComment}
                        onMouseMove={handleMouseMoveComment}
                        className="flex overflow-x-auto space-x-8 p-4  mx-28 scrollbar-hide cursor-pointer"
                    >
                        {comments.map((commentCard, index) => (
                            <CommentCard
                                key={index}
                                userName={commentCard.userName}
                                photo={commentCard.photo}
                                commentText={commentCard.commentText}
                                date={commentCard.date}
                                nbJaime={commentCard.nbJaime}
                            />
                        ))}
                    </div>
                </section>

                <Footer/>
            </main>
        </div>
    );
};

export default HomePage;
