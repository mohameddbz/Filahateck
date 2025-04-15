// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../utils/api/httpService'; // Ajustez le chemin si nécessaire

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role: 'user', token: '...' }
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  
  // Fonction pour vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('Token');
      
      if (token) {
        try {
          // Vérifier le rôle de l'utilisateur avec le token
          const response = await makeRequest('/roles/my-role', 'GET', {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (response && response.data) {
            const role = response.data.role;
            // Convertir le rôle du backend en format utilisé par votre application
            let userRole = '';
            
            switch (role) {
              case 'Admin':
                userRole = 'admin';
                break;
              case 'Manager':
                userRole = 'manager';
                break;
              case 'User':
                userRole = 'user';
                break;
              case 'Seller':
                userRole = 'seller';
                break;
              default:
                userRole = '';
            }
            
            // Restaurer l'état d'authentification
            if (userRole) {
              setUser({ role: userRole, token });
            }
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du token:', error);
          localStorage.removeItem('Token'); // Token invalide ou expiré
        }
      }
      
      setLoading(false);
    };
    
    verifyAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('sellerRole'); // Supprime aussi le rôle de vendeur si présent
    setUser(null);
    navigate('/auth/SignIn');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);