import React, { useState, useEffect } from 'react';
import { makeRequest } from './../../../utils/api/httpService';
import { Table } from './../../../components/ui/Table';

const FonctionalityManagement = () => {
  const [legendes, setLegendes] = useState([]);
  const [indices, setIndices] = useState([]); // Store available indices
  const [showForm, setShowForm] = useState(false);
  const [newLegend, setNewLegend] = useState({
    intervalDeb: '',
    intervalFin: '',
    color: '#000000', // Default color (black)
    descriptionLeg: '',
    indiceId: '', // Dropdown selection
  });

  useEffect(() => {
    const fetchLegendes = async () => {
      try {
        const response = await makeRequest('/legende', 'GET');
        setLegendes(response.data || []);
      } catch (error) {
        console.error('Error fetching legendes:', error);
      }
    };

    const fetchIndices = async () => {
      try {
        const response = await makeRequest('/indice', 'GET');
        setIndices(response.data || []); // Assuming response.data contains an array of indices
      } catch (error) {
        console.error('Error fetching indices:', error);
      }
    };

    fetchLegendes();
    fetchIndices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLegend((prev) => ({ ...prev, [name]: value }));
  };

  // Convert HEX to RGB
  const hexToRgb = (hex) => {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const legendData = {
        ...newLegend,
        color: hexToRgb(newLegend.color), // Convert HEX to RGB before sending
      };

      const response = await makeRequest('/legende', 'POST', legendData);
      setLegendes([...legendes, response.data]); // Update state
      setShowForm(false); // Hide form after submission
      setNewLegend({ intervalDeb: '', intervalFin: '', color: '#000000', descriptionLeg: '', indiceId: '' });
    } catch (error) {
      console.error('Error adding legend:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Legend Management</h1>

      {/* Table des légendes */}
      <div className="w-full max-w-5xl mb-6">
        <h2 className="text-2xl font-semibold mb-4">Legend Table</h2>
        <Table
          cols={['id', 'intervalDeb', 'intervalFin', 'color', 'descriptionLeg', 'indiceId']}
          data={legendes}
        />
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        {showForm ? 'Hide Form' : 'Add Legend'}
      </button>

      {/* Form for Adding Legend */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Legend</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="intervalDeb"
              placeholder="Interval Debut"
              value={newLegend.intervalDeb}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="intervalFin"
              placeholder="Interval Fin"
              value={newLegend.intervalFin}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />

            {/* Color Picker */}
            <div className="flex items-center gap-2">
              <input
                type="color"
                name="color"
                value={newLegend.color}
                onChange={handleInputChange}
                className="w-12 h-8 cursor-pointer"
              />
              <span>{hexToRgb(newLegend.color)}</span> {/* Show RGB value */}
            </div>

            <input
              type="text"
              name="descriptionLeg"
              placeholder="Description"
              value={newLegend.descriptionLeg}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />

            {/* Indice Dropdown */}
            <select
              name="indiceId"
              value={newLegend.indiceId}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select an Indice</option>
              {indices.map((indice) => (
                <option key={indice.id} value={indice.id}>
                  {indice.indiceName} {/* Adjust based on your API response structure */}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FonctionalityManagement;
