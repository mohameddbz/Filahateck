import React, { useState } from 'react';

export const TableParcelle = ({ cols, data, onRowClick }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div>
      {/* Tableau principal */}
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
                key={row.identifiantU} // Utilisation d'un identifiant unique non exclu
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

      {/* Section Détails */}
      {selectedRow && (
        <div className="mt-6 p-4 bg-gray-50 border rounded shadow-md">
          <h3 className="text-2xl font-semibold mb-2">Détails de la Parcelle</h3>
          <ul className="list-disc pl-6">
            {Object.entries(selectedRow).map(([key, value]) => {
              if (['id', 'userId', 'createdAt', 'updatedAt'].includes(key)) return null; // Exclusion des IDs

              if (typeof value === 'object' && value !== null) {
                return (
                  <li key={key} className="mb-2">
                    <strong>{key}:</strong>
                    <ul className="ml-4 list-disc">
                      {key === 'geom' && value.coordinates ? (
                        value.coordinates[0].map((coord, index) => (
                          <li key={index}>
                            Point {index + 1}: [{coord[1]}, {coord[0]}]
                          </li>
                        ))
                      ) : (
                        Object.entries(value).map(([subKey, subValue]) => (
                          subKey !== 'id' && ( // Exclusion des ID dans les objets imbriqués
                            <li key={subKey}>
                              <strong>{subKey}:</strong> {subValue}
                            </li>
                          )
                        ))
                      )}
                    </ul>
                  </li>
                );
              } else {
                return (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
