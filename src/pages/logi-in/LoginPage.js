import React from 'react';
import Header from './../../components/layout/Header';
import LoginForm from './../../components/form/LoginForm';
import LoginImage from './../../images/logIn.jpg'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <div className="hidden md:block w-2/3 ">
          <img 
            src={LoginImage} 
            alt="Plant Image" 
            className="h-full w-full" 
          />
        </div>
        <div className="flex w-full items-center md:w-2/3">
          <LoginForm />
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
