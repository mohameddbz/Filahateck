import React, { useState, useEffect } from 'react';
import { makeRequest } from './../../../utils/api/httpService';
import { Table } from './../../../components/ui/Table';
import { set } from 'react-hook-form';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // Liste des rôles
  const [selectedRole, setSelectedRole] = useState(''); // Rôle sélectionné pour le filtre
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  // Récupérer la liste des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeRequest('/users', 'GET');
        const formattedData = response.data.data.map(user => ({
          ...user,
          onDelete: handleDelete,
        }));
        setUsers(formattedData);
        setIsLoadingUsers(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Récupérer la liste des rôles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await makeRequest('/roles', 'GET');
        setRoles(response.data.data); 
        setIsLoadingRoles(false);
        
      } catch (error) {
        console.error('Error fetching roles:', error);
        setIsLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  // Supprimer un utilisateur
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await makeRequest(`/users/${userId}`, 'DELETE');
        setUsers(users.filter(user => user.id !== userId));
        console.log(`User with ID ${userId} deleted.`);
      } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
      }
    }
  };

  // Filtrer les utilisateurs en fonction du rôle sélectionné
  const filteredUsers = selectedRole
    ? users.filter(user => user.roleName === selectedRole)
    : users;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">User Management</h1>

      {/* Filtre par rôle */}
      <div className="mb-6 w-full max-w-5xl">
        <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700">
          Filter by Role:
        </label>
        <select
          id="roleFilter"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">All Roles</option>
          {!isLoadingRoles && roles.map((role) => (
            <option key={role.id} value={role.roleName}>
              {role.roleName}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="w-full max-w-5xl">
        <Table
          cols={['userName', 'email', 'phoneNumber', 'roleName']}
          data={filteredUsers}
        />
      </div>
    </div>
  );
};

export default UserManagement;