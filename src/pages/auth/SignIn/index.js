// SignIn.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInImage from './../../../assets/auth/SignIn/image.jpg';
import SignInForm from '../../../components/pages/auth/forms/SignInForm';
import { makeRequest } from '../../../utils/api/httpService';
import { useAuth } from '../../../context/AuthProvider'; // Ajustez le chemin si nécessaire

const SignIn = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // Vérifier si l'utilisateur est déjà connecté et rediriger en conséquence
  useEffect(() => {
    // Ne vérifier que si le chargement est terminé et l'utilisateur est connecté
    if (!loading && user) {
      const redirectBasedOnRole = () => {
        switch (user.role) {
          case 'admin':
            navigate('/admin/UserManagement');
            break;
          case 'manager':
            navigate('/manager/Dashboard');
            break;
          case 'user':
            navigate('/user/marketplace');
            break;
          case 'seller':
            navigate('/seller/marketplace');
            break;
          default:
            break;
        }
      };
      
      redirectBasedOnRole();
    }
  }, [user, loading, navigate]);
  
  // Afficher un chargement pendant la vérification
  if (loading) {
    return <div>Chargement...</div>; // Ou un composant de spinner/loader
  }
  
  // Si l'utilisateur n'est pas connecté, afficher le formulaire
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