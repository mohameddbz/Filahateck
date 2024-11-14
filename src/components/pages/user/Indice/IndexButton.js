import React , {useContext} from 'react';
import imageCCI from './../../../../assets/user/indice/CCI.png';
import imageNDDI from './../../../../assets/user/indice/NDDI.png';
import { TextContext } from './../../../../context/TextContext';

const IndexButtons = () => {
  const { updateText } = useContext(TextContext);
  const handleButtonClick = (title, description, legendText3, legendText2, legendText1 , legendText4, recommendationText) => {
    updateText({
      title,
      description,
      legendText1,
      legendText2,
      legendText3,
      legendText4,
      recommendationText,
    });
  };

  const NDDI = () => {
    handleButtonClick('Indice NDDI', 'Vous pouvez surveiller ci-dessous les variations de la densité de végétation, qui permettent destimer la santé des cultures et la présence éventuelle de stress hydrique. Le NDDI (Normalized Difference Drought Index) vous aide à détecter les signes de sécheresse ou de stress des plantes en fonction de humidité du sol et des feuilles.', '','','','','','')
  }

  const CCI = () => {
    handleButtonClick('Indice CCI', 'Vous pouvez analyser ci-dessous les indices de couleur des cultures, qui mesurent la vigueur de la végétation et indiquent la santé des plantes. Le CCI (Chlorophyll Content Index) permet de suivre la teneur en chlorophylle, un indicateur clé de la photosynthèse et de la productivité des cultures, afin optimiser les interventions agricoles.', '','','','','','')
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      <button onClick={NDDI} 
              className='bg-SidebarColor justify-center items-center w-36 rounded-3xl flex p-4 gap-4 h-24 shadow hover:bg-gray-300'>
        <p className='text-xl ' >NDDI </p>
        <img src={imageNDDI} alt="NDDI" />
      </button>
      <button onClick={CCI}  className='bg-SidebarColor justify-center items-center w-36 rounded-3xl flex p-4 gap-4 h-24 shadow hover:bg-gray-300'>
        <p className='text-xl ' >CCI </p>
        <img src={imageCCI} alt="CCI" />
      </button>
      <button onClick={CCI}  className='bg-SidebarColor justify-center items-center w-36 rounded-3xl flex p-4 gap-4 h-24 shadow hover:bg-gray-300'>
        <p className='text-xl ' >CCI </p>
        <img src={imageCCI} alt="CCI" />
      </button>
  </div>
  );
};

export default IndexButtons;
