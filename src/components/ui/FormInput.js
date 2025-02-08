import React from 'react';

const FormInput = ({ name, label, value, handleChange }) => (
  <div>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      className="w-full border border-green-500 p-2 rounded"
      placeholder={label}
    />
  </div>
);

export default FormInput;
