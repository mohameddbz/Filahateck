import React, { useState, useEffect } from 'react';
import { makeRequest } from './../../../utils/api/httpService';
import { Table } from './../../../components/ui/Table';

const AbonnementManagement = () => {
  const [abonnements, setAbonnements] = useState([]);

  useEffect(() => {
    const fetchAbonnements = async () => {
      try {
        const response = await makeRequest('/abonnementUser', 'GET');
        const formattedData = response.data.map(abonnement => ({
          id: abonnement.id,
          date_abonnement: new Date(abonnement.date_abonnement).toLocaleDateString(),
          etat: abonnement.etat,
          nameAbonnement: abonnement.Abonnement?.nameAbonnement || '',
          prices: abonnement.Abonnement?.prices || '',
          email: abonnement.User?.email || '',
          onDelete: handleDelete,
          onToggleEtat: handleToggleEtat,
        }));
        setAbonnements(formattedData);
      } catch (error) {
        console.error('Error fetching abonnements:', error);
      }
    };

    fetchAbonnements();
  }, []);

  const handleDelete = async (abonnementId) => {
    if (window.confirm('Are you sure you want to delete this abonnement?')) {
      try {
        await makeRequest(`/api/abonnements/${abonnementId}`, 'DELETE');
        setAbonnements(abonnements.filter(abonnement => abonnement.id !== abonnementId));
        console.log(`Abonnement with ID ${abonnementId} deleted.`);
      } catch (error) {
        console.error(`Error deleting abonnement with ID ${abonnementId}:`, error);
      }
    }
  };

  const handleToggleEtat = async (abonnementId, currentEtat) => {
    const newEtat = currentEtat === 'actif' ? 'désactivé' : 'actif';
    try {
      await makeRequest(`/abonnementUser/${abonnementId}`, 'PUT', { etat: newEtat });
      setAbonnements(prevAbonnements =>
        prevAbonnements.map(abonnement =>
          abonnement.id === abonnementId ? { ...abonnement, etat: newEtat } : abonnement
        )
      );
      console.log(`Abonnement with ID ${abonnementId} updated to "${newEtat}".`);
    } catch (error) {
      console.error(`Error updating abonnement etat for ID ${abonnementId}:`, error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Abonnement Management</h1>
      <div className="w-full max-w-5xl">
        <Table
          cols={[
            'date_abonnement',
            'etat',
            'nameAbonnement',
            'prices',
            'email',
            'Actions',
          ]}
          data={abonnements.map(abonnement => ({
            ...abonnement,
            Actions: (
              <div className="flex gap-2">
                <button
                  onClick={() => abonnement.onToggleEtat(abonnement.id, abonnement.etat)}
                  className={`px-4 py-2 rounded-md text-white ${
                    abonnement.etat === 'actif' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {abonnement.etat === 'actif' ? 'Désactiver' : ' Activer '}
                </button>
                {abonnement.onDelete && (
                  <button
                    onClick={() => abonnement.onDelete(abonnement.id)}
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

export default AbonnementManagement;
