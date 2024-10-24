import { useContext } from "react";
import { LanguageContext } from './../../../context/LanguageContext';


const  ButtonLang = () => {

    const {toggleToArabic, toggleToFrench } = useContext(LanguageContext);

    return (
        <div className="absolute top-16 right-4 space-x-2">
        <button 
            onClick={toggleToArabic}
            className="bg-green-700 text-white px-2 py-1 rounded">
          Ar
        </button>
        <button
            onClick={toggleToFrench} 
            className="bg-green-700 text-white px-2 py-1 rounded">
          Fr
        </button>
      </div>
    );
}

export default ButtonLang;