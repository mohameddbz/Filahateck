import React, { useState, useEffect } from 'react';
import { makeRequest } from './../../../utils/api/httpService';
import { Table } from './../../../components/ui/Table';

const AbonnementManagement = () => {
  const [abonnements, setAbonnements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAbonnement, setNewAbonnement] = useState({
    nameAbonnement: '',
    nameClient: '',
    prices: '',
  });

  useEffect(() => {
    const fetchAbonnements = async () => {
      try {
        const response = await makeRequest('/abonnement/details', 'GET');

        const formattedData = response.data.map(abonnement => ({
          id: abonnement.id,
          nameAbonnement: abonnement.nameAbonnement || '',
          nameClient: abonnement.nameClient || '',
          prices: abonnement.prices || '',
          createdAt: abonnement.createdAt
            ? new Date(abonnement.createdAt).toLocaleDateString()
            : '',
          updatedAt: abonnement.updatedAt
            ? new Date(abonnement.updatedAt).toLocaleDateString()
            : '',
          fonctionnalities: abonnement.fonctionnalities?.map(f => ({
            id: f.id,
            name: f.name,
            psudo: f.psudo,
          })) || [],
          indices: abonnement.indices?.map(i => ({
            id: i.id,
            name: i.name,
            recommendation: i.recommendation,
            description: i.description,
          })) || [],
        }));

        setAbonnements(formattedData);
      } catch (error) {
        console.error('Error fetching abonnements:', error);
      }
    };

    fetchAbonnements();
  }, []);

  const handleDelete = async abonnementId => {
    if (window.confirm('Are you sure you want to delete this abonnement?')) {
      try {
        await makeRequest(`/abonnement/${abonnementId}`, 'DELETE');
        setAbonnements(abonnements.filter(abonnement => abonnement.id !== abonnementId));
        console.log(`Abonnement with ID ${abonnementId} deleted.`);
      } catch (error) {
        console.error(`Error deleting abonnement with ID ${abonnementId}:`, error);
      }
    }
  };

  const handleAddAbonnement = async e => {
    e.preventDefault();
    try {
      const response = await makeRequest('/abonnement', 'POST', newAbonnement);
      setAbonnements([...abonnements, response.data]);
      setNewAbonnement({ nameAbonnement: '', nameClient: '', prices: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding abonnement:', error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewAbonnement({ ...newAbonnement, [name]: value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Abonnement Management</h1>

      <div className="w-full max-w-5xl mb-4">
        <Table
          cols={['nameAbonnement', 'nameClient', 'prices', 'Actions']}
          data={abonnements.map(abonnement => ({
            ...abonnement,
            Actions: (
              <div className="flex gap-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(abonnement.id)}
                >
                  Delete
                </button>
              </div>
            ),
          }))}
        />

        <button
          className="bg-blue-500 text-center text-white px-4 py-2 rounded my-4 mx-auto block"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Abonnement'}
        </button>

        {showForm && (
          <form onSubmit={handleAddAbonnement} className="mb-6 p-4 border rounded bg-gray-100">
            <div className="mb-4">
              <label className="block mb-2">Abonnement Name:</label>
              <input
                type="text"
                name="nameAbonnement"
                value={newAbonnement.nameAbonnement}
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
                value={newAbonnement.nameClient}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Prices:</label>
              <input
                type="text"
                name="prices"
                value={newAbonnement.prices}
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

export default AbonnementManagement;
