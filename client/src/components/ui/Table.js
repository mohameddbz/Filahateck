import React, { useState } from 'react';

export const Table = ({ cols, data }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRowClick = (row) => {
    setSelectedUser(row);
  };

  return (
    <div>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            {cols.map((col, index) => (
              <th key={index} className="p-3">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr 
                key={row.id}
                className="border-t cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(row)}
              >
                {cols.map((colKey, idx) => (
                  <td key={idx} className="p-3">{row[colKey]}</td>
                ))}
                
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-3 text-center" colSpan={cols.length + 1}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* User Info Section */}
      {selectedUser && (
        <div className="mt-6 p-4 bg-gray-50 border rounded shadow-md">
          <h3 className="text-2xl font-semibold mb-2">Plus Details</h3>
          
          {/* Simple Key-Value Fields */}
          <ul>
            {Object.entries(selectedUser).map(([key, value]) => {
              if (['id', 'createdAt', 'updatedAt'].includes(key)) return null;

              if (typeof value !== 'object' || value === null) {
                return (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                );
              }

              return null;
            })}
          </ul>

          {/* Nested Objects Handling */}
          {Object.entries(selectedUser).map(([key, value]) => (
            Array.isArray(value) && (
              <div key={key} className="mt-4">
                <h4 className="text-lg font-medium">{key}:</h4>
                <ul className="ml-4 mt-2">
                  {value.map((item, index) => (
                    <li key={index} className="mt-1">
                      <div className="p-2 border rounded-md bg-gray-100">
                        {Object.entries(item).map(([subKey, subValue]) => (
                          subKey !== 'id' && (
                            <div key={subKey}>
                              <strong>{subKey}:</strong> {subValue}
                            </div>
                          )
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      )}


    </div>
  );
};