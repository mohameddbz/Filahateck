

function Sales() {
    const salesItems = [
      { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '750 DZ', total: '1500 DZ' },
      { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '750 DZ', total: '1500 DZ' },
      { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '750 DZ', total: '1500 DZ' },
      { name: 'Graines et semences', quantity: '30 Kg', date: '10/04/2024', price: '750 DZ', total: '1500 DZ' },
      // Add other items as needed
    ];
  
    return (
      <div className=" p-4 mt-4">
        <h2 className="text-xl text-orange-600 font-bold mb-4">Ventes</h2>
        <table className="w-3/4">
          <thead>
            <tr className="bg-orange-400 text-center">
              <th className="p-2 border-b">Nom du produit</th>
              <th className="p-2 border-b">Quantité vendue</th>
              <th className="p-2 border-b">Date de vente</th>
              <th className="p-2 border-b">Prix</th>
              <th className="p-2 border-b">Total</th>
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
  