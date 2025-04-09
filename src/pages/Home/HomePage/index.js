// import React, { useContext, useRef } from 'react';
// import { LanguageContext } from './../../../context/LanguageContext';
// import translations from './../../../utils/constant/homePage';
// import ServiceCard from './../../../components/pages/home/ServiceCard';
// import SolutionCard from './../../../components/pages/home/SolutionCard';
// import CommentCard from './../../../components/pages/home/CommentCard';
// import Footer from '../../../components/pages/home/footer/footer';
// import { services } from './../../../data/home/services';
// import { solutions } from './../../../data/home/solutions';
// import {comments} from './../../../data/home/comments'

// const HomePage = () => {
//     const { isArabic } = useContext(LanguageContext);
//     const lang = isArabic ? 'arabic' : 'french';
//     const texts = translations[lang];

//     const scrollRef = useRef(null);
//     const scrollRefComments = useRef(null);
//     let isDragging = false, startX, scrollLeft;
//     let isDraggingComment = false, startXComment, scrollLeftComment;

//     const startDragging = (e, type) => {
//         if (type === 'comment') {
//             isDraggingComment = true;
//             startXComment = e.pageX - scrollRefComments.current.offsetLeft;
//             scrollLeftComment = scrollRefComments.current.scrollLeft;
//         } else {
//             isDragging = true;
//             startX = e.pageX - scrollRef.current.offsetLeft;
//             scrollLeft = scrollRef.current.scrollLeft;
//         }
//     };

//     const handleMouseMove = (e, type) => {
//         if (type === 'comment' && isDraggingComment) {
//             const x = e.pageX - scrollRefComments.current.offsetLeft;
//             scrollRefComments.current.scrollLeft = scrollLeftComment - (x - startXComment) * 2;
//         } else if (isDragging) {
//             const x = e.pageX - scrollRef.current.offsetLeft;
//             scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
//         }
//     };

//     const stopDragging = (type) => {
//         if (type === 'comment') isDraggingComment = false;
//         else isDragging = false;
//     };

//     return (
//         <div>
//             <main>
//                 <section className="bg-my-image flex justify-center items-center h-[400px] bg-center bg-cover">
//                     <div className="w-full text-white px-10 text-shadow">
//                         <p className="text-5xl font-bold">{texts.heroTitle}</p>
//                         <p className="text-2xl">{texts.heroSubtitle}</p>
//                     </div>
//                 </section>

//                 <section className="flex-col justify-center items-center">
//                     <div className="mx-auto text-center text-2xl max-w-3xl">
//                         <h1 className="my-4 font-semibold text-4xl text-myOrange">{texts.servicesTitle}</h1>
//                         <p>{texts.servicesSubtitle}</p>
//                     </div>

//                     <div
//                         ref={scrollRef}
//                         onMouseDown={(e) => startDragging(e)}
//                         onMouseLeave={() => stopDragging()}
//                         onMouseUp={() => stopDragging()}
//                         onMouseMove={(e) => handleMouseMove(e)}
//                         className="flex overflow-x-auto space-x-8 p-4 mx-5 scrollbar-hide cursor-pointer"
//                     >
//                         {services.map((serviceCard, index) => (
//                             <ServiceCard
//                                 key={index}
//                                 title={isArabic ? serviceCard.nomAr : serviceCard.nomFr}
//                                 description={isArabic ? serviceCard.descriptionAr : serviceCard.descriptionFr}
//                                 image={serviceCard.imageService}
//                             />
//                         ))}
//                     </div>
//                 </section>

//                 <hr className="my-20 mx-auto w-2/4" />

//                 <section>
//                     <div className="mx-auto text-center text-2xl max-w-3xl">
//                         <h1 className="my-4 font-semibold text-4xl text-myOrange">{texts.solutionsTitle}</h1>
//                         <p>{texts.solutionsSubtitle}</p>
//                     </div>

//                     <div className="grid grid-cols-1 w-fit sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10 mx-auto my-10">
//                         {solutions.map((solutionCard, index) => (
//                             <SolutionCard
//                                 key={index}
//                                 title={isArabic ? solutionCard.nomAr : solutionCard.nomFr}
//                                 image={solutionCard.imageSolution}
//                             />
//                         ))}
//                     </div>
//                 </section>

//                 <hr className="my-20 mx-auto w-2/4" />

//                 <section className="flex-col justify-center items-center">
//                     <div className="mx-auto text-center text-2xl max-w-3xl">
//                         <h1 className="my-4 font-semibold text-4xl text-myOrange">{texts.commentsTitle}</h1>
//                         <p>{texts.commentsSubtitle}</p>
//                     </div>

//                     <div
//                         ref={scrollRefComments}
//                         onMouseDown={(e) => startDragging(e, 'comment')}
//                         onMouseLeave={() => stopDragging('comment')}
//                         onMouseUp={() => stopDragging('comment')}
//                         onMouseMove={(e) => handleMouseMove(e, 'comment')}
//                         className="flex overflow-x-auto space-x-8 p-4 mx-28 scrollbar-hide cursor-pointer"
//                     >
//                         {comments.map((commentCard, index) => (
//                             <CommentCard
//                                 key={index}
//                                 userName={isArabic ? commentCard.userNameAr : commentCard.userNameFr}
//                                 commentText={isArabic ? commentCard.commentTextAr : commentCard.commentTextFr}
//                                 photo={commentCard.photo}
//                                 date={commentCard.date}
//                                 nbJaime={commentCard.nbJaime}
//                             />
//                         ))}
//                     </div>
//                 </section>
//             </main>

//             <Footer />
//         </div>
//     );
// };

// export default HomePage;
import React, { useContext, useRef, useState, useEffect } from 'react';
import { LanguageContext } from './../../../context/LanguageContext';
import translations from './../../../utils/constant/homePage';
import ServiceCard from './../../../components/pages/home/ServiceCard';
import SolutionCard from './../../../components/pages/home/SolutionCard';
import CommentCard from './../../../components/pages/home/CommentCard';
import Footer from '../../../components/pages/home/footer/footer';
import { services } from './../../../data/home/services';
import { solutions } from './../../../data/home/solutions';
import { comments } from './../../../data/home/comments';

const HomePage = () => {
    const { isArabic } = useContext(LanguageContext);
    const lang = isArabic ? 'arabic' : 'french';
    const texts = translations[lang];

    const scrollRef = useRef(null);
    const scrollRefComments = useRef(null);
    
    // États pour suivre le glissement
    const [isDragging, setIsDragging] = useState(false);
    const [isDraggingComment, setIsDraggingComment] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [startXComment, setStartXComment] = useState(0);
    const [scrollLeftComment, setScrollLeftComment] = useState(0);
    
    // État pour suivre la largeur de l'écran
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    // Mettre à jour la largeur de l'écran lors du redimensionnement
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Gestion du glissement pour les appareils mobiles et de bureau
    const startDragging = (e, type) => {
        // Déterminer si l'événement est tactile ou de souris
        const pageX = e.touches ? e.touches[0].pageX : e.pageX;
        
        if (type === 'comment') {
            setIsDraggingComment(true);
            setStartXComment(pageX - scrollRefComments.current.offsetLeft);
            setScrollLeftComment(scrollRefComments.current.scrollLeft);
        } else {
            setIsDragging(true);
            setStartX(pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
        }
    };

    const handleMove = (e, type) => {
        if (!isDragging && !isDraggingComment) return;
        e.preventDefault();
        
        // Déterminer si l'événement est tactile ou de souris
        const pageX = e.touches ? e.touches[0].pageX : e.pageX;
        
        if (type === 'comment' && isDraggingComment && scrollRefComments.current) {
            const x = pageX - scrollRefComments.current.offsetLeft;
            const walk = (x - startXComment) * 2;
            scrollRefComments.current.scrollLeft = scrollLeftComment - walk;
        } else if (isDragging && scrollRef.current) {
            const x = pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 2;
            scrollRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const stopDragging = (type) => {
        if (type === 'comment') {
            setIsDraggingComment(false);
        } else {
            setIsDragging(false);
        }
    };

    return (
        <div className={isArabic ? 'rtl' : 'ltr'}>
            <main>
                {/* Section Hero - Responsive */}
                <section className="bg-my-image flex justify-center items-center h-[400px] md:h-[400px] bg-center bg-cover">
                    <div className="w-full text-white px-4 md:px-10 text-shadow text-center md:text-left">
                        <p className="text-3xl md:text-5xl font-bold">{texts.heroTitle}</p>
                        <p className="text-xl md:text-2xl mt-2">{texts.heroSubtitle}</p>
                    </div>
                </section>

                {/* Section Services - Responsive */}
                <section className="flex-col justify-center items-center py-4 md:py-8">
                    <div className="mx-auto text-center text-xl md:text-2xl max-w-[90%] md:max-w-3xl px-4">
                        <h1 className="my-4 font-semibold text-3xl md:text-4xl text-myOrange">{texts.servicesTitle}</h1>
                        <p>{texts.servicesSubtitle}</p>
                    </div>

                    <div
                        ref={scrollRef}
                        onMouseDown={(e) => startDragging(e)}
                        onMouseLeave={() => stopDragging()}
                        onMouseUp={() => stopDragging()}
                        onMouseMove={(e) => handleMove(e)}
                        onTouchStart={(e) => startDragging(e)}
                        onTouchMove={(e) => handleMove(e)}
                        onTouchEnd={() => stopDragging()}
                        className="flex overflow-x-auto space-x-4 md:space-x-8 p-4 mx-2 md:mx-5 scrollbar-hide"
                        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
                    >
                        {services.map((serviceCard, index) => (
                            <ServiceCard
                                key={index}
                                title={isArabic ? serviceCard.nomAr : serviceCard.nomFr}
                                description={isArabic ? serviceCard.descriptionAr : serviceCard.descriptionFr}
                                image={serviceCard.imageService}
                            />
                        ))}
                    </div>
                </section>

                <hr className="my-6 md:my-12 mx-auto w-[80%] md:w-2/4" />

                {/* Section Solutions - Responsive */}
                <section className="py-4 md:py-8">
                    <div className="mx-auto text-center text-xl md:text-2xl max-w-[90%] md:max-w-3xl px-4">
                        <h1 className="my-4 font-semibold text-3xl md:text-4xl text-myOrange">{texts.solutionsTitle}</h1>
                        <p>{texts.solutionsSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 w-fit sm:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-y-12 gap-x-6 md:gap-x-10 mx-auto my-8 md:my-10 px-4">
                        {solutions.map((solutionCard, index) => (
                            <SolutionCard
                                key={index}
                                title={isArabic ? solutionCard.nomAr : solutionCard.nomFr}
                                image={solutionCard.imageSolution}
                            />
                        ))}
                    </div>
                </section>

                <hr className="my-6 md:my-12 mx-auto w-[80%] md:w-2/4" />

                {/* Section Comments - Responsive */}
                <section className="flex-col justify-center items-center py-4 md:py-8">
                    <div className="mx-auto text-center text-xl md:text-2xl max-w-[90%] md:max-w-3xl px-4">
                        <h1 className="my-4 font-semibold text-3xl md:text-4xl text-myOrange">{texts.commentsTitle}</h1>
                        <p>{texts.commentsSubtitle}</p>
                    </div>

                    <div
                        ref={scrollRefComments}
                        onMouseDown={(e) => startDragging(e, 'comment')}
                        onMouseLeave={() => stopDragging('comment')}
                        onMouseUp={() => stopDragging('comment')}
                        onMouseMove={(e) => handleMove(e, 'comment')}
                        onTouchStart={(e) => startDragging(e, 'comment')}
                        onTouchMove={(e) => handleMove(e, 'comment')}
                        onTouchEnd={() => stopDragging('comment')}
                        className="flex overflow-x-auto space-x-4 md:space-x-8 p-4 mx-4 md:mx-28 scrollbar-hide"
                        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
                    >
                        {comments.map((commentCard, index) => (
                            <CommentCard
                                key={index}
                                userName={isArabic ? commentCard.userNameAr : commentCard.userNameFr}
                                commentText={isArabic ? commentCard.commentTextAr : commentCard.commentTextFr}
                                photo={commentCard.photo}
                                date={commentCard.date}
                                nbJaime={commentCard.nbJaime}
                            />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;