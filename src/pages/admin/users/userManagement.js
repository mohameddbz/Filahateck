import React, { useState, useEffect } from 'react';
import { makeRequest } from './../../../utils/api/httpService';
import { Table } from './../../../components/ui/Table';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeRequest('/users', 'GET');
        const formattedData = response.data.data.map(user => ({
          ...user,
          onDelete: handleDelete,
        }));
        setUsers(formattedData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await makeRequest(`/api/users/${userId}`, 'DELETE');
        setUsers(users.filter(user => user.id !== userId));
        console.log(`User with ID ${userId} deleted.`);
      } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">User Management</h1>
      <div className="w-full max-w-5xl">
        <Table
          cols={['userName', 'email', 'phoneNumber','roleName']}
          data={users}
        />
      </div>
    </div>
  );
};

export default UserManagement;
