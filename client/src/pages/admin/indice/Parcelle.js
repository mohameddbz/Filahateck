import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Polygon, FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useDropzone } from 'react-dropzone';
import { TableParcelle } from './../../../components/ui/TableParcelle';
import { makeRequest } from './../../../utils/api/httpService';

// Composant pour initialiser les panneaux à l'intérieur du MapContainer
const MapPanes = () => {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      map.createPane('labels');
      map.getPane('labels').style.zIndex = 650;
      map.getPane('labels').style.pointerEvents = 'none';
    }
  }, [map]);
  
  return null;
};

const Parcelle = () => {
  const [parcelles, setParcelles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedParcelle, setSelectedParcelle] = useState(null);
  const [newParcelle, setNewParcelle] = useState({
    identifiantU: '',
    geom: null,
    bEN: null,
    bES: null,
    bWN: null,
    bWS: null,
    userId: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchParcelles = async () => {
      try {
        const response = await makeRequest('/parcelle', 'GET');
        const formattedData = response.data.map(parcelle => ({
          ...parcelle,
          geom: typeof parcelle.geom === 'string' ? JSON.parse(parcelle.geom) : parcelle.geom,
        }));
        setParcelles(formattedData);
      } catch (error) {
        console.error('Erreur de récupération des parcelles:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await makeRequest('/users', 'GET');
        console.log("---",response.data.data)
        setUsers(response.data.data);
      } catch (error) {
        console.error('Erreur de récupération des utilisateurs:', error);
      }
    };

    fetchParcelles();
    fetchUsers();
  }, []);

  const calculateBounds = (coordinates) => {
    let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;

    coordinates.forEach(([lng, lat]) => {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    });

    return {
      bEN: maxLat,
      bES: minLat,
      bWN: maxLng,
      bWS: minLng
    };
  };

  const handleCreated = (e) => {
    const { layer } = e;
    const geoJSON = layer.toGeoJSON();
    const bounds = calculateBounds(geoJSON.geometry.coordinates[0]);

    setNewParcelle({ 
      ...newParcelle, 
      geom: geoJSON.geometry,
      ...bounds
    });
  };

  const handleFileUpload = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const json = JSON.parse(event.target.result);
      const bounds = calculateBounds(json.features[0].geometry.coordinates[0]);

      setNewParcelle({ 
        ...newParcelle, 
        geom: json.features[0].geometry,
        ...bounds
      });
    };
    reader.readAsText(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.geojson',
    onDrop: handleFileUpload,
  });

  const handleAddParcelle = async () => {
    if (!newParcelle.identifiantU || !newParcelle.geom || !newParcelle.userId) {
      alert('Veuillez remplir tous les champs et définir une géométrie.');
      return;
    }

    try {
      await makeRequest('/parcelle', 'POST', newParcelle);
      alert('Parcelle ajoutée avec succès !');
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la parcelle:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Parcelles</h1>

      <TableParcelle 
        cols={["id", "identifiantU", "bEN", "bES", "bWN", "bWS", "userId"]} 
        data={parcelles} 
        onRowClick={setSelectedParcelle} 
      />

      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Fermer le formulaire" : "Ajouter une parcelle"}
      </button>

      {showForm && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Nouvelle Parcelle</h2>
          <input 
            type="text" 
            placeholder="Identifiant Unique" 
            className="border p-2 w-full mb-2" 
            value={newParcelle.identifiantU} 
            onChange={(e) => setNewParcelle({ ...newParcelle, identifiantU: e.target.value })}
          />

          <select 
            className="border p-2 w-full mb-2" 
            value={newParcelle.userId} 
            onChange={(e) => setNewParcelle({ ...newParcelle, userId: e.target.value })}
          >
            <option value="">Sélectionner un utilisateur</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.userName}</option>
            ))}
          </select>

          <div {...getRootProps()} className="border p-4 cursor-pointer bg-white mb-2">
            <input {...getInputProps()} />
            <p>Glissez et déposez un fichier GeoJSON ici, ou cliquez pour sélectionner un fichier</p>
          </div>

          <MapContainer 
            center={[36.5, 3.3]} 
            zoom={10} 
            className="h-[700px] w-full"
          >
            {/* Composant pour initialiser les panneaux */}
            <MapPanes />
            
            {/* Couche d'imagerie satellite */}
            <TileLayer 
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />
            
            {/* Couche avec labels/toponymes */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              attribution="Esri, HERE, Garmin, © OpenStreetMap contributors"
              pane="labels"
            />
            
            <FeatureGroup>
              <EditControl
                position="topright"
                draw={{ polygon: true, rectangle: false, circle: false, marker: false, polyline: false }}
                onCreated={handleCreated}
              />
            </FeatureGroup>
          </MapContainer>

          {newParcelle.geom && (
            <div className="mt-4 p-2 bg-gray-200 rounded">
              <p><strong>bEN:</strong> {newParcelle.bEN}</p>
              <p><strong>bES:</strong> {newParcelle.bES}</p>
              <p><strong>bWN:</strong> {newParcelle.bWN}</p>
              <p><strong>bWS:</strong> {newParcelle.bWS}</p>
            </div>
          )}

          <button 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full" 
            onClick={handleAddParcelle}
          >
            Enregistrer la Parcelle
          </button>
        </div>
      )}
    </div>
  );
};

export default Parcelle;