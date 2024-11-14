import React, { useContext, useRef } from 'react';
import { LanguageContext } from './../../../context/LanguageContext';
import translations from './../../../utils/constant/homePage';
import ServiceCard from './../../../components/pages/home/ServiceCard';
import SolutionCard from './../../../components/pages/home/SolutionCard';
import CommentCard from './../../../components/pages/home/CommentCard';
import Footer from '../../../components/pages/home/footer/footer';
import { services } from './../../../data/home/services';
import { solutions } from './../../../data/home/solutions';
import {comments} from './../../../data/home/comments'

const HomePage = () => {
    const { isArabic } = useContext(LanguageContext);
    const lang = isArabic ? 'arabic' : 'french';
    const texts = translations[lang];

    const scrollRef = useRef(null);
    const scrollRefComments = useRef(null);
    let isDragging = false, startX, scrollLeft;
    let isDraggingComment = false, startXComment, scrollLeftComment;

    const startDragging = (e, type) => {
        if (type === 'comment') {
            isDraggingComment = true;
            startXComment = e.pageX - scrollRefComments.current.offsetLeft;
            scrollLeftComment = scrollRefComments.current.scrollLeft;
        } else {
            isDragging = true;
            startX = e.pageX - scrollRef.current.offsetLeft;
            scrollLeft = scrollRef.current.scrollLeft;
        }
    };

    const handleMouseMove = (e, type) => {
        if (type === 'comment' && isDraggingComment) {
            const x = e.pageX - scrollRefComments.current.offsetLeft;
            scrollRefComments.current.scrollLeft = scrollLeftComment - (x - startXComment) * 2;
        } else if (isDragging) {
            const x = e.pageX - scrollRef.current.offsetLeft;
            scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
        }
    };

    const stopDragging = (type) => {
        if (type === 'comment') isDraggingComment = false;
        else isDragging = false;
    };

    return (
        <div>
            <main>
                <section className="bg-my-image flex justify-center items-center h-[400px] bg-center bg-cover">
                    <div className="w-full text-white px-10 text-shadow">
                        <p className="text-5xl font-bold">{texts.heroTitle}</p>
                        <p className="text-2xl">{texts.heroSubtitle}</p>
                    </div>
                </section>

                <section className="flex-col justify-center items-center">
                    <div className="mx-auto text-center text-2xl max-w-3xl">
                        <h1 className="my-4 font-semibold text-4xl text-myOrange">{texts.servicesTitle}</h1>
                        <p>{texts.servicesSubtitle}</p>
                    </div>

                    <div
                        ref={scrollRef}
                        onMouseDown={(e) => startDragging(e)}
                        onMouseLeave={() => stopDragging()}
                        onMouseUp={() => stopDragging()}
                        onMouseMove={(e) => handleMouseMove(e)}
                        className="flex overflow-x-auto space-x-8 p-4 mx-5 scrollbar-hide cursor-pointer"
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

                <hr className="my-20 mx-auto w-2/4" />

                <section>
                    <div className="mx-auto text-center text-2xl max-w-3xl">
                        <h1 className="my-4 font-semibold text-4xl text-myOrange">{texts.solutionsTitle}</h1>
                        <p>{texts.solutionsSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 w-fit sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10 mx-auto my-10">
                        {solutions.map((solutionCard, index) => (
                            <SolutionCard
                                key={index}
                                title={isArabic ? solutionCard.nomAr : solutionCard.nomFr}
                                image={solutionCard.imageSolution}
                            />
                        ))}
                    </div>
                </section>

                <hr className="my-20 mx-auto w-2/4" />

                <section className="flex-col justify-center items-center">
                    <div className="mx-auto text-center text-2xl max-w-3xl">
                        <h1 className="my-4 font-semibold text-4xl text-myOrange">{texts.commentsTitle}</h1>
                        <p>{texts.commentsSubtitle}</p>
                    </div>

                    <div
                        ref={scrollRefComments}
                        onMouseDown={(e) => startDragging(e, 'comment')}
                        onMouseLeave={() => stopDragging('comment')}
                        onMouseUp={() => stopDragging('comment')}
                        onMouseMove={(e) => handleMouseMove(e, 'comment')}
                        className="flex overflow-x-auto space-x-8 p-4 mx-28 scrollbar-hide cursor-pointer"
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
