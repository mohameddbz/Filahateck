import React from 'react';
import Header from './../../components/layout/Header';
import SignupImage from './../../images/signUp.jpg'
import SignUpForm from '../../components/form/signupFrorm';

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <div className="flex w-full items-center md:w-2/3">
          <SignUpForm />
        </div>
        <div className="hidden md:block w-2/3 ">
          <img 
            src={SignupImage} 
            alt="Plant Image" 
            className="h-full w-full" 
          />
        </div>
      </div>
      
    </div>
  );
};

export default SignUpPage;
