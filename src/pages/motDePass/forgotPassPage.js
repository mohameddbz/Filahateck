import React from 'react';
import Header from '../../components/layout/Header';
import forgotPasswordImage from './../../images/forgotMotPass.png'
import ForgotPassForm from '../../components/form/ForgotPassForm';

const ForgotPassPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <div className="hidden md:block w-2/3 ">
          <img 
            src={forgotPasswordImage} 
            alt="Plant Image" 
            className="h-full w-full" 
          />
        </div>
        <div className="flex w-full items-center md:w-2/3">
          <ForgotPassForm />
        </div>
      </div>
      
    </div>
  );
};

export default ForgotPassPage;
