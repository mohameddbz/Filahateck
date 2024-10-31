import React from 'react';

const FormInput = ({ label }) => (
  <div>
    {/* <label className="block text-gray-700 mb-1">{label}</label> */}
    <input
      type="text"
      className="w-full border border-green-500 p-2 rounded"
      placeholder={label}
    />
  </div>
);

export default FormInput;
