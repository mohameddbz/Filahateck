import React, { useState, useEffect } from 'react';
import { makeRequest } from './../../../utils/api/httpService';
import { Table } from './../../../components/ui/Table';

const IndiceManagement = () => {
  const [showIndiceForm, setShowIndiceForm] = useState(false);
  const [showRecommendationForm, setShowRecommendationForm] = useState(false);
  const [indices, setIndices] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [indiceRes, recommendationRes] = await Promise.all([
          makeRequest('/indice', 'GET'),
          makeRequest('/abonnement', 'GET'),
        ]);
        setIndices(indiceRes.data || []);
        setRecommendations(recommendationRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddIndice = async (data) => {
    try {
      const response = await makeRequest('/indice', 'POST', data);
      setIndices((prev) => [...prev, response.data]);
      setShowIndiceForm(false);
    } catch (error) {
      console.error('Error adding indice:', error);
    }
  };

  const handleRecommendationSubmit = async (data) => {
    try {
      const payload = {
        IndiceId: data.indiceId,
        AbonnementId: data.recommendationId,
      };
      const response = await makeRequest('/abonnementIndice', 'POST', payload);
      setShowRecommendationForm(false);
      console.log(`Assigned  indice ${data.indiceId} to abonement ${data.recommendationId}`);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert('Oops! Something went wrong. Please try again later.');
      } else {
        console.error('Error:', error);
        alert('Recommendation already assigned.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Indice Management</h1>

      <div className="w-full max-w-5xl mb-6">
        <Table cols={['id', 'indiceName', 'recomndation', 'description']} data={indices} />
      </div>

      {!showIndiceForm && (
        <button
          onClick={() => setShowIndiceForm(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mb-4"
        >
          Add New Indice
        </button>
      )}

      {showIndiceForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              indiceName: formData.get('indiceName'),
              recomndation: formData.get('recomndation'),
              description: formData.get('description'),
            };
            handleAddIndice(data);
          }}
          className="bg-white shadow-lg p-6 rounded-lg w-full max-w-xl"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Indice Name</label>
            <input type="text" name="indiceName" className="w-full border rounded-lg p-2" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Recommendation</label>
            <input type="text" name="recomndation" className="w-full border rounded-lg p-2" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea name="description" className="w-full border rounded-lg p-2" required />
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
              onClick={() => setShowIndiceForm(false)}
              className="bg-gray-400 text-white py-2 px-4 ml-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!showRecommendationForm && (
        <button
          onClick={() => setShowRecommendationForm(true)}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition mt-4"
        >
          Assign Recommendation to Indice
        </button>
      )}

      {showRecommendationForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              indiceId: formData.get('indiceId'),
              recommendationId: formData.get('recommendationId'),
            };
            handleRecommendationSubmit(data);
          }}
          className="bg-white shadow-lg p-6 rounded-lg w-full max-w-xl"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Indice</label>
            <select name="indiceId" className="w-full border rounded-lg p-2" required>
              <option value="">Select...</option>
              {indices.map((indice) => (
                <option key={indice.id} value={indice.id}>
                  {indice.indiceName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Abonement</label>
            <select name="recommendationId" className="w-full border rounded-lg p-2" required>
              <option value="">Select...</option>
              {recommendations.map((rec) => (
                <option key={rec.id} value={rec.id}>
                  {rec.nameAbonnement}
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
              onClick={() => setShowRecommendationForm(false)}
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

export default IndiceManagement;
