import React , {useContext} from 'react';
import { TextContext } from './../../../../context/TextContext';

const Legend = ({indicesData}) => {
  const { textData } = useContext(TextContext);
  return (
    <div className="w-1/2 text-sm">
      <h3 className="font-semibold text-myOrange">Légende de la carte</h3>
      <ul className="mt-2 space-y-1">
        <li><span className="inline-block w-4 h-4 bg-blue-800 rounded-full mr-2"></span>{textData.legendText1}</li>
        <li><span className="inline-block w-4 h-4 bg-blue-400 rounded-full mr-2"></span>{textData.legendText2}</li>
        <li><span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2"></span>{textData.legendText3}</li>
        <li><span className="inline-block w-4 h-4 bg-blue-100 rounded-full mr-2"></span>{textData.legendText4}</li>
      </ul>
    </div>
  );
}

export default Legend;
