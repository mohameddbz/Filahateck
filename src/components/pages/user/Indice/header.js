import React , {useContext} from 'react';
import { TextContext } from './../../../../context/TextContext';

const Header = ({ title , text }) => { 
  const { textData } = useContext(TextContext);

  return (
    <header>
      <h1 className="text-2xl font-bold text-myOrange">{title ? title : textData.title}</h1>
      <p className="mt-2 text-lg">
        {text ? text : textData.description}
      </p>
    </header>
  );
};

export default Header;

