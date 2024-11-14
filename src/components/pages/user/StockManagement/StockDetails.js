import React, { useContext } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';
import {translations} from './../../../../utils/constant/StockDetails'


function StockDetails() {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  const stockItems = [
    { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '1500 DZ', status: texts.inStock },
    { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '1500 DZ', status: texts.inStock },
    { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '1500 DZ', status: texts.inStock },
    { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '1500 DZ', status: texts.inStock },
    // Add other items as needed
  ];

  return (
    <div className="p-4 mt-4">
      <h2 className="text-xl text-orange-600 font-bold mb-4">{texts.title}</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-orange-400 text-center">
            <th className="p-2">{texts.productName}</th>
            <th className="p-2">{texts.availableQuantity}</th>
            <th className="p-2">{texts.stockDate}</th>
            <th className="p-2">{texts.price}</th>
            <th className="p-2">{texts.stockType}</th>
            <th className="p-2">{texts.lastMovement}</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-300 text-center' : 'bg-white text-center'}
            >
              <td className="p-2 border-b">{item.name}</td>
              <td className="p-2 border-b">{item.quantity}</td>
              <td className="p-2 border-b">{item.date}</td>
              <td className="p-2 border-b">{item.price}</td>
              <td className="p-2 border-b">{item.status}</td>
              <td className="p-2 border-b">
                {item.status === texts.inStock ? texts.added : texts.removed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockDetails;
