import React , {useContext} from 'react';
import { TextContext } from './../../../../context/TextContext';

const Recommendations = ({text}) => {
  const { textData } = useContext(TextContext);
  return(
  <div className="text-sm w-1/2">
    <h3 className="font-semibold text-myOrange">Recommendations</h3>
    <p className="mt-2">
     {text ? text : textData.recommendationText}
    </p>
  </div>
);
}

export default Recommendations;
