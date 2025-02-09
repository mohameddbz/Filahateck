import React, { useState, useEffect } from 'react';
import { makeRequest } from './../../../utils/api/httpService';
import { Table } from './../../../components/ui/Table';

const FonctionalityManagement = () => {
  const [showFunctionalityForm, setShowFunctionalityForm] = useState(false);
  const [showAbonnementForm, setShowAbonnementForm] = useState(false);
  const [fonctionalities, setFonctionalities] = useState([]);
  const [abonnements, setAbonnements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fonctionalityRes, abonnementRes] = await Promise.all([
          makeRequest('/fonctionnality', 'GET'),
          makeRequest('/abonnement', 'GET'),
        ]);
        setFonctionalities(fonctionalityRes.data || []);
        setAbonnements(abonnementRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddFunctionality = async (data) => {
    try {
      const response = await makeRequest('/fonctionnality', 'POST', data);
      setFonctionalities((prev) => [...prev, response.data]);
      setShowFunctionalityForm(false);
    } catch (error) {
      console.error('Error adding functionality:', error);
    }
  };

  const handleAbonnementSubmit = async (data) => {
    try {
      const payload = {
        fonctionnalityId: data.fonctionalityId,
        abonnementId: data.abonnementId,
      };
      console.log(payload)
      const response = await makeRequest('/abonnementFonctionnality', 'POST', payload);
      console.log(response)
      setShowAbonnementForm(false);
      console.log(
        `Assigned abonnement ${data.abonnementId} to functionality ${data.fonctionalityId}`
      );
    } catch (error) {
        if (error.response && error.response.status === 500) {
            alert('Oops! Something went wrong. Please try again later.');
          } else {
            console.error('Error:', error);
            alert(' Fonctionality deja assigned.');
          }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Fonctionality Management</h1>

      <div className="w-full max-w-5xl mb-6">
        <Table cols={['id', 'name', 'psudo']} data={fonctionalities} />
      </div>

      {!showFunctionalityForm && (
        <button
          onClick={() => setShowFunctionalityForm(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mb-4"
        >
          Add New Fonctionality
        </button>
      )}

      {showFunctionalityForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              name: formData.get('name'),
              psudo: formData.get('psudo'),
            };
            handleAddFunctionality(data);
          }}
          className="bg-white shadow-lg p-6 rounded-lg w-full max-w-xl"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Fonctionality Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pseudo</label>
            <input
              type="text"
              name="psudo"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowFunctionalityForm(false)}
              className="bg-gray-400 text-white py-2 px-4 ml-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!showAbonnementForm && (
        <button
          onClick={() => setShowAbonnementForm(true)}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition mt-4"
        >
          Assign Abonnement to Fonctionality
        </button>
      )}

      {showAbonnementForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              fonctionalityId: formData.get('fonctionalityId'),
              abonnementId: formData.get('abonnementId'),
            };
            handleAbonnementSubmit(data);
          }}
          className="bg-white shadow-lg p-6 rounded-lg w-full max-w-xl"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Select Fonctionality
            </label>
            <select
              name="fonctionalityId"
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="">Select...</option>
              {fonctionalities.map((func) => (
                <option key={func.id} value={func.id}>
                  {func.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Select Abonnement
            </label>
            <select
              name="abonnementId"
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="">Select...</option>
              {abonnements.map((abo) => (
                <option key={abo.id} value={abo.id}>
                  {abo.nameAbonnement}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowAbonnementForm(false)}
              className="bg-gray-400 text-white py-2 px-4 ml-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FonctionalityManagement;
