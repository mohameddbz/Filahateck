import React, { useContext } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';

const Offre = ({ text, titre, functionalities, price, isChecked, onCheckboxChange }) => {
    const { isArabic } = useContext(LanguageContext);

    // Set the text direction based on language
    const textDirection = isArabic ? { direction: 'rtl' } : { direction: 'ltr' };

    return (
        <div className="bg-gray-200 rounded-3xl w-2/3 p-4 mb-6">
            <div className="flex items-center">
                <div className="bg-myGreen w-32 h-40 rounded-[100%] rounded-tl-lg rounded-bl-lg flex items-center justify-center text-white font-bold">
                    <p>{text}</p>
                </div>
                <div className="flex-1 ml-4 p-2" style={textDirection}>
                    <h2 className="text-myOrange-50 font-bold text-xl">{titre}</h2>
                    <ul className="list-disc ml-6 mt-2 text-base">
                        {functionalities.map((func, index) => (
                            <li key={func.id || index}>{func.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center gap-6 p-4">
                    <div className="bg-myYellow w-32 h-10 rounded-lg flex items-center justify-center text-red-600">
                        <p>{price} DA </p>
                    </div>
                    <div className="ml-2">
                        <input 
                            type="checkbox" 
                            className="w-6 h-6 border-SidebarColor rounded" 
                            checked={isChecked} 
                            onChange={onCheckboxChange} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offre;
