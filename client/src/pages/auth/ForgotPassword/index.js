import React from 'react';
import forgotPasswordImage from './../../../assets/auth/forgotPassword/image.png'
import ForgotPassForm from './../../../components/pages/auth/forms/ForgotPassForm';

const ForgotPass = () => {
  return (
   <>
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
   </>
  );
};

export default ForgotPass;
