

function StockDetails() {
    const stockItems = [
      { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '1500 DZ', status: 'En stock' },
      { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '1500 DZ', status: 'En stock' },
      { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '1500 DZ', status: 'En stock' },
      { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '1500 DZ', status: 'En stock' },
      // Add other items as needed
    ];
  
    return (
      <div className=" p-4 mt-4">
        <h2 className="text-xl text-orange-600 font-bold mb-4">Détails du Stock</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-orange-400 text-center">
              <th className="p-2">Nom du produit</th>
              <th className="p-2">Quantité disponible</th>
              <th className="p-2">Date d'entrée en stock</th>
              <th className="p-2">Prix</th>
              <th className="p-2">Type du stock</th>
              <th className="p-2">Dernier mouvement</th>
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
                  {item.status === 'En stock' ? 'Ajout' : 'Retrait'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default StockDetails;
  