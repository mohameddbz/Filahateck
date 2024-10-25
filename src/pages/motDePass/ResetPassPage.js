import React from 'react';
import Header from '../../components/layout/Header';
import ResetPasswordImage from './../../images/MotDePass.jpg'
import ResetPassForm from '../../components/form/ResetPassForm';


const ResetPassPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <div className="hidden md:block w-2/3 ">
          <img 
            src={ResetPasswordImage} 
            alt="Plant Image" 
            className="h-full w-full" 
          />
        </div>
        <div className="flex w-full items-center md:w-2/3">
          <ResetPassForm />
        </div>
      </div>
      
    </div>
  );
};

export default ResetPassPage;
