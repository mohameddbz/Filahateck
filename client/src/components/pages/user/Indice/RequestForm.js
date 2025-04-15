import React, { useState, useEffect } from 'react';
import { makeRequest } from './../../../../utils/api/httpService';
import { getApiUrl } from './../../../../utils/api/getRoute';

const RequestForm = ({ indicesData }) => {
  const [formData, setFormData] = useState({
    indice: '',
    startDate: '',
    endDate: '',
    parcelleId: '',
  });

  const [parcelles, setParcelles] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fonction pour récupérer l'ID de l'utilisateur
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) throw new Error('Token non trouvé.');

      const response = await makeRequest('/users/get', 'GET', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data?.data?.user_id || null;
    } catch (error) {
      console.error('Erreur User ID:', error);
      return null;
    }
  };

  // Fonction pour récupérer les parcelles en utilisant l'ID utilisateur
  const fetchParcelles = async (userId) => {
    if (!userId) return; // Éviter d'exécuter la requête si userId est null
    try {
      const response = await makeRequest(`/parcelle/user/${userId}`, 'GET', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`,
        },
      });

      console.log("Réponse des parcelles:", response);
      setParcelles(response.data || []); // Gérer le cas où response.data est undefined
    } catch (error) {
      console.error('Erreur lors de la récupération des parcelles:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const fetchedUserId = await fetchUserId();
      if (fetchedUserId) {
        setUserId(fetchedUserId); // ✅ Correct assignment
        await fetchParcelles(fetchedUserId);
      }
    };

    initializeData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("L'utilisateur n'est pas identifié.");
      return;
    }

    const { indice, startDate, endDate, parcelleId } = formData;

    if (!indice || !startDate || !endDate || !parcelleId) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const payload = {
      bbox: '[2.932537, 36.461184, 2.935888, 36.463558]',
      startDate,
      endDate,
      width: 750,
      height: 400,
      user_id: userId,
      indice_id: parseInt(indice, 10),
      parcelle_id: parseInt(parcelleId, 10),
    };

    console.log("Payload envoyé:", payload);

    const apiUrl = getApiUrl(indice);

    if (!apiUrl) {
      alert("Sélection d'indice invalide.");
      return;
    }

    try {
      const response = await makeRequest(apiUrl, 'POST', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`,
        },
      });
      alert('Requête soumise avec succès!');
      console.log('Réponse:', response.data);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      alert(`Erreur: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md">
      <h3 className="font-bold text-lg mb-4">Requête Indice</h3>
      <div className="flex flex-col gap-4">
        <select
          name="indice"
          value={formData.indice}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          <option value="">Choisir un indice</option>
          {indicesData.map((index) => (
            <option key={index.indiceId} value={index.indiceId}>
              {index.indiceName}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />

        <select
          name="parcelleId"
          value={formData.parcelleId}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          <option value="">Choisir une parcelle</option>
          {parcelles.length > 0 ? (
            parcelles.map((parcelle) => (
              <option key={parcelle.id} value={parcelle.id}>
                {parcelle.identifiantU}
              </option>
            ))
          ) : (
            <option disabled>Aucune parcelle disponible</option>
          )}
        </select>

        <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
