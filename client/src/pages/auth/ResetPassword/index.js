import React from 'react';
import ResetPasswordImage from './../../../assets/auth/ResetPassword/image.jpg'
import ResetPassForm from './../../../components/pages/auth/forms/ResetPassForm';


const ResetPass = () => {
  return (
    <>
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
    </>
  );
};

export default ResetPass;
