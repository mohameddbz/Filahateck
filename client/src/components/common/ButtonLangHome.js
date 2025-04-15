import { useContext } from "react";
import { LanguageContext } from './..//../context/LanguageContext';

const ButtonLangHome = () => {
    const { toggleToArabic, toggleToFrench } = useContext(LanguageContext);
    
    return (
        <div className="absolute top-16 right-4 space-x-2 flex justify-between">
            <button 
                onClick={toggleToArabic}
                className="px-4 py-2 text-sm font-medium rounded text-white bg-myGreen "
            >
                Ar
            </button>
            
            <button 
                onClick={toggleToFrench}
                className="px-4 py-2 text-sm font-medium rounded text-white bg-myGreen"
            >
                Fr
            </button>
        </div>
    );
}

export default ButtonLangHome;