// FormComponent.jsx
import React, { useState } from 'react';

const FormComponent = ({ formFields, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white mt-6 p-8 w-full max-w-md shadow-lg rounded-2xl"
    >
      <h2 className="text-2xl font-semibold mb-4">New Entry</h2>
      {formFields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          <input
            type="text"
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required={field.required}
          />
        </div>
      ))}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
