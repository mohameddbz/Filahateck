import React, { useState } from 'react';
import { makeRequest } from './../../../../utils/api/httpService'; 
import { getApiUrl } from './../../../../utils/api/getRoute';

const RequestForm = ({ indicesData, userId}) => {
  const [formData, setFormData] = useState({
    indice: '',
    startDate: '',
    endDate: '',
    parcelleId: '1',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { indice, startDate, endDate, parcelleId } = formData;

    if (!indice || !startDate || !endDate) {
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
      console.log('Response:', response.data);
    } catch (error) {
      alert(`${error || error}`);
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

        <input
          type="number"
          name="parcelleId"
          value={formData.parcelleId}
          onChange={handleChange}
          className="p-2 border rounded-md"
          placeholder="Parcelle ID"
        />

        <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
