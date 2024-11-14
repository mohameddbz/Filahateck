import React from 'react';
import SignInImage from './../../../assets/auth/SignIn/image.jpg'
import SignInForm from '../../../components/pages/auth/forms/SignInForm';

const SignIn = () => {
  return (
    <>
        <div className="hidden md:block w-2/3 ">
          <img 
            src={SignInImage} 
            alt="Plant Image" 
            className="h-full w-full" 
          />
        </div>
        <div className="flex w-full items-center md:w-2/3">
          <SignInForm />
        </div>
    </>
  );
};

export default SignIn;
