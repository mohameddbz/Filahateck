import React from 'react';

const Offre = ({ text, titre, description, price , isChecked, onCheckboxChange }) => {
    return (
        <div className="bg-gray-200 rounded-3xl w-2/3">
            <div className="flex items-center">
                <div className="bg-green-500 w-32 h-40 rounded-[100%] rounded-tl-lg rounded-bl-lg flex items-center justify-center text-white font-bold">
                    <p>{text}</p>
                </div>
                <div className="flex-1 ml-4 p-2">
                    <h2 className="text-orange-500 font-bold text-xl">{titre}</h2>
                    <ul className="list-disc ml-6 mt-2 text-base">
                        {description.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center gap-6 p-4">
                    <div className="bg-yellow-400 w-32 h-10 rounded-lg flex items-center justify-center text-red-600">
                        <p>{price}</p>
                    </div>
                    <div className="ml-2">
                        <input 
                            type="checkbox" 
                            className="w-6 h-6 border-gray-300 rounded" 
                            checked={isChecked} 
                            onChange={onCheckboxChange} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offre;
