import React from 'react';

const Success = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex px-12 items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white  p-6 rounded-lg shadow-lg text-center">
        <p className="text-green-500 text-lg mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-orange-500 text-white py-2 px-4 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Success;