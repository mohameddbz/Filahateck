


function HeaderStock() {
    return (
      <div className="bg-gray-200 p-4 ml-4 mr-4 mt-4 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold">Aujourd'hui 30/09</p>
          <p className="text-sm text-gray-500">Vous pouvez toujours consulter vos achats, vos ventes...</p>
        </div>
        <div className="flex space-x-8">
          <div className="text-center">
            <p className="text-xl font-bold text-green-600">25 000 DZ</p>
            <p className="text-lg text-gray-600">Entrées</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-red-600">17 000 DZ</p>
            <p className="text-lg text-gray-600">Sorties</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-yellow-600">8 000 DZ</p>
            <p className="text-lg text-gray-600">Différence</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default HeaderStock;
  