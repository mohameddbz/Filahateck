import React, { useContext } from 'react';
import { LanguageContext } from './../../../../context/LanguageContext';
import {translations} from './../../../../utils/constant/Sales'


function Sales() {
  const { isArabic } = useContext(LanguageContext);
  const lang = isArabic ? 'arabic' : 'french';
  const texts = translations[lang];

  const salesItems = [
    { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '750 DZ', total: '1500 DZ' },
    { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '750 DZ', total: '1500 DZ' },
    { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '750 DZ', total: '1500 DZ' },
    { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '750 DZ', total: '1500 DZ' },
    // Add other items as needed
  ];

  return (
    <div className="p-4 mt-4">
      <h2 className="text-xl text-orange-600 font-bold mb-4">{texts.title}</h2>
      <table className="w-3/4">
        <thead>
          <tr className="bg-orange-400 text-center">
            <th className="p-2 border-b">{texts.productName}</th>
            <th className="p-2 border-b">{texts.soldQuantity}</th>
            <th className="p-2 border-b">{texts.saleDate}</th>
            <th className="p-2 border-b">{texts.price}</th>
            <th className="p-2 border-b">{texts.total}</th>
          </tr>
        </thead>
        <tbody>
          {salesItems.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-300 text-center' : 'bg-white text-center'}
            >
              <td className="p-2 border-b">{item.name}</td>
              <td className="p-2 border-b">{item.quantity}</td>
              <td className="p-2 border-b">{item.date}</td>
              <td className="p-2 border-b">{item.price}</td>
              <td className="p-2 border-b">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
