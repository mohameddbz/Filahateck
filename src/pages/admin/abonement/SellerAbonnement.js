import React, { useState, useEffect } from 'react';
import { makeRequest } from './../../../utils/api/httpService';
import { Table } from './../../../components/ui/Table';

const SellerAbonnementManagement = () => {
  const [sellerAbonnements, setSellerAbonnements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSellerAbonnement, setNewSellerAbonnement] = useState({
    nameAbonnement: '',
    nameClient: '',
    price: '',
    isLimited: false,
    nbPost: null,
    priority: 1,
  });

  // Récupérer tous les abonnements
  useEffect(() => {
    const fetchSellerAbonnements = async () => {
      try {
        const response = await makeRequest('/sellerAbonnement', 'GET'); // Utilisez la route correcte
        setSellerAbonnements(response.data);
        console.log('SellerAbonnements fetched:', response.data);
      } catch (error) {
        console.error('Error fetching sellerAbonnements:', error);
      }
    };

    fetchSellerAbonnements();
  }, []);

  // Supprimer un abonnement
  const handleDelete = async (sellerAbonnementId) => {
    if (window.confirm('Are you sure you want to delete this sellerAbonnement?')) {
      try {
        await makeRequest(`/sellerAbonnement/${sellerAbonnementId}`, 'DELETE');
        setSellerAbonnements(sellerAbonnements.filter(sellerAbonnement => sellerAbonnement.id !== sellerAbonnementId));
        console.log(`SellerAbonnement with ID ${sellerAbonnementId} deleted.`);
      } catch (error) {
        console.error(`Error deleting sellerAbonnement with ID ${sellerAbonnementId}:`, error);
      }
    }
  };

  // Ajouter un nouvel abonnement
  const handleAddSellerAbonnement = async (e) => {
    e.preventDefault();
    try {
      const response = await makeRequest('/sellerAbonnement', 'POST', newSellerAbonnement);
      setSellerAbonnements([...sellerAbonnements, response.data]);
      setNewSellerAbonnement({
        nameAbonnement: '',
        nameClient: '',
        price: '',
        isLimited: false,
        nbPost: null,
        priority: 1,
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding sellerAbonnement:', error);
    }
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSellerAbonnement({
      ...newSellerAbonnement,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Seller Abonnement Management</h1>

      <div className="w-full max-w-5xl mb-4">
        {/* Tableau des abonnements */}
        <Table
          cols={['nameAbonnement', 'nameClient', 'price', 'isLimited', 'nbPost', 'priority', 'Actions']}
          data={sellerAbonnements.map(sellerAbonnement => ({
            ...sellerAbonnement,
            isLimited: sellerAbonnement.isLimited ? 'Yes' : 'No', // Afficher "Yes" ou "No" pour isLimited
            Actions: (
              <div className="flex gap-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(sellerAbonnement.id)}
                >
                  Delete
                </button>
              </div>
            ),
          }))}
        />

        {/* Bouton pour afficher/masquer le formulaire */}
        <button
          className="bg-blue-500 text-center text-white px-4 py-2 rounded my-4 mx-auto block"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Seller Abonnement'}
        </button>

        {/* Formulaire pour ajouter un nouvel abonnement */}
        {showForm && (
          <form onSubmit={handleAddSellerAbonnement} className="mb-6 p-4 border rounded bg-gray-100">
            <div className="mb-4">
              <label className="block mb-2">Abonnement Name:</label>
              <input
                type="text"
                name="nameAbonnement"
                value={newSellerAbonnement.nameAbonnement}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Client Name:</label>
              <input
                type="text"
                name="nameClient"
                value={newSellerAbonnement.nameClient}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Price:</label>
              <input
                type="text"
                name="price"
                value={newSellerAbonnement.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Is Limited:</label>
              <input
                type="checkbox"
                name="isLimited"
                checked={newSellerAbonnement.isLimited}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span>Limited</span>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Number of Posts:</label>
              <input
                type="number"
                name="nbPost"
                value={newSellerAbonnement.nbPost || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Priority:</label>
              <input
                type="number"
                name="priority"
                value={newSellerAbonnement.priority}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SellerAbonnementManagement;