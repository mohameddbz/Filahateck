// src/pages/StockManagementPage.js

import React from 'react';
import HeaderStock from '../../components/pages/user/StockManagement/HeaderStock';
import StockDetails from '../../components/pages/user/StockManagement/StockDetails';
import Purchases from '../../components/pages/user/StockManagement/Purchases';
import Sales from '../../components/pages/user/StockManagement/Sales';


function StockManagement() {
  return (
  <div className="flex-grow mt-4">
        <HeaderStock/>
        <StockDetails />
        <Purchases />
        <Sales />
      </div>
    );
}

export default StockManagement;
