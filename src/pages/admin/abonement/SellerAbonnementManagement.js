import React, { useState, useEffect } from 'react';
import { makeRequest } from './../../../utils/api/httpService';
import { Table } from './../../../components/ui/Table';

const SellerAbonnementManagement = () => {
  const [sellerAbonnements, setSellerAbonnements] = useState([]);

  useEffect(() => {
    const fetchSellerAbonnements = async () => {
      try {
        const response = await makeRequest('/sellerAbonnementUser', 'GET');
        console.log('SellerAbonnements:', response.data);
        const formattedData = response.data.map(sellerAbonnement => ({
          id: sellerAbonnement.id,
          dateDebut: new Date(sellerAbonnement.dateDebut).toLocaleDateString(),
          dateFin: new Date(sellerAbonnement.dateFin).toLocaleDateString(),
          etat: sellerAbonnement.etat,
          nameAbonnement: sellerAbonnement.SellerAbonnement?.nameAbonnement || '',
          price: sellerAbonnement.SellerAbonnement?.price || '',
          email: sellerAbonnement.User?.email || '',
          nbPost: sellerAbonnement.nbPost || 'Illimité',
          onDelete: handleDelete,
          onToggleEtat: handleToggleEtat,
        }));
        setSellerAbonnements(formattedData);
      } catch (error) {
        console.error('Error fetching sellerAbonnements:', error);
      }
    };

    fetchSellerAbonnements();
  }, []);

  const handleDelete = async (sellerAbonnementId) => {
    if (window.confirm('Are you sure you want to delete this sellerAbonnement?')) {
      try {
        await makeRequest(`/sellerAbonnementUser/${sellerAbonnementId}`, 'DELETE');
        setSellerAbonnements(sellerAbonnements.filter(sellerAbonnement => sellerAbonnement.id !== sellerAbonnementId));
        console.log(`SellerAbonnement with ID ${sellerAbonnementId} deleted.`);
      } catch (error) {
        console.error(`Error deleting sellerAbonnement with ID ${sellerAbonnementId}:`, error);
      }
    }
  };

  const handleToggleEtat = async (sellerAbonnementId, currentEtat) => {
    const newEtat = currentEtat === 'actif' ? 'désactivé' : 'actif';
    try {
      await makeRequest(`/sellerAbonnementUser/${sellerAbonnementId}`, 'PUT', { etat: newEtat });
      setSellerAbonnements(prevSellerAbonnements =>
        prevSellerAbonnements.map(sellerAbonnement =>
          sellerAbonnement.id === sellerAbonnementId ? { ...sellerAbonnement, etat: newEtat } : sellerAbonnement
        )
      );
      console.log(`SellerAbonnement with ID ${sellerAbonnementId} updated to "${newEtat}".`);
    } catch (error) {
      console.error(`Error updating sellerAbonnement etat for ID ${sellerAbonnementId}:`, error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Seller Abonnement Management</h1>
      <div className="w-full max-w-5xl">
        <Table
          cols={[
            'dateDebut',
            'dateFin',
            'etat',
            'nameAbonnement',
            'price',
            'email',
            'nbPost',
            'Actions',
          ]}
          data={sellerAbonnements.map(sellerAbonnement => ({
            ...sellerAbonnement,
            Actions: (
              <div className="flex gap-2">
                <button
                  onClick={() => sellerAbonnement.onToggleEtat(sellerAbonnement.id, sellerAbonnement.etat)}
                  className={`px-4 py-2 rounded-md text-white ${
                    sellerAbonnement.etat === 'actif' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {sellerAbonnement.etat === 'actif' ? 'Désactiver' : ' Activer '}
                </button>
                {sellerAbonnement.onDelete && (
                  <button
                    onClick={() => sellerAbonnement.onDelete(sellerAbonnement.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
};

export default SellerAbonnementManagement;