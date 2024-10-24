import React from 'react';
import Logo from './../../images/logo.png'

const Header = () => {
  return (
    <header className="bg-green-600 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-bold">
            <img src={Logo} alt="logo image"
                className="h-10 w-10"/>
        </div>
        <nav className="space-x-16 flex items-center">
          <a href="/" className="text-white text-xl">Accueil</a>
          <a href="/offers" className="text-white text-xl">Offres</a>
          <a href="/about" className="text-white text-xl">À propos</a>
          <a href="/login" className="text-white text-xl">Se connecter</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
