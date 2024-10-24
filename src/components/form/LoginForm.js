import React from 'react';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";

const LoginForm = () => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-green-700 text-3xl font-bold mb-6 text-center">Se connecter</h2>
      <form>
        <div className="mb-4">
          <label className="block text-green-700" htmlFor="email">Email</label>
          <div className="flex items-center border border-green-500 rounded p-2">
            <MdEmail className="text-green-500" size={24} />
            <input 
              type="email" 
              id="email" 
              className="w-full p-2 outline-none" 
              placeholder="Email" 
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-green-700" htmlFor="password">Mot de passe</label>
          <div className="flex items-center border border-green-500 rounded p-2">
            <FaLock className="text-green-500" size={20} />
            <input 
              type="password" 
              id="password" 
              className="w-full p-2 outline-none" 
              placeholder="Mot de passe" 
            />
            <MdOutlineVisibility className="text-green-500" size={24}/>
          </div>
        </div>
        <div className="text-right text-green-700 mb-4">
          <a href="/forgot-password">Mot de passe oublié</a>
        </div>
        <button 
          type="submit" 
          className="bg-orange-500 text-white p-2 w-full rounded">
          Se connecter
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          Je n'ai pas un compte ? <a href="/register" className="text-green-600">Créer un compte</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
