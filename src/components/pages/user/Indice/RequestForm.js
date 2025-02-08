import React, { useState } from 'react';

const RequestForm = ({ indicesData, userId }) => {
  const [indice, setIndice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!indice || !startDate || !endDate) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    alert(`Données soumises : Indice ${indice}, Début ${startDate}, Fin ${endDate}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md">
      <h3 className="font-bold text-lg mb-4">Requête Indice</h3>
      <div className="flex flex-col gap-4">
        <select
          value={indice}
          onChange={(e) => setIndice(e.target.value)}
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
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
