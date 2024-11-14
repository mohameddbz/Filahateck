import React , {useContext} from 'react';
import { TextContext } from './../../../../context/TextContext';

const Header = () =>{ 
  const { textData } = useContext(TextContext);
  return(
    <header>
      <h1 className="text-2xl font-bold text-myOrange">{textData.title}</h1>
      <p className="mt-2 text-lg">
        {textData.description}
      </p>
    </header>
  );
}
export default Header;
