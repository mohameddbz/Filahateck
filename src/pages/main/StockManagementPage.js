// src/pages/StockManagementPage.js

import React from 'react';
import SidebarLayout from './../../components/layout/SidebarLayout'; // Import SidebarLayout
import HeaderStock from '../../components/table/headerStock';
import StockDetails from '../../components/table/StockDetails';
import Purchases from '../../components/table/Purchases';
import Sales from '../../components/table/Sales';
import ButtonLang from '../../components/common/Button/ButtonLang';
import Header from '../../components/layout/Header'; 

function StockManagementPage() {
  return (
    <SidebarLayout Header={Header} ButtonLang={ButtonLang}>
      <div className="flex-1 mt-6 p-4 md:p-6">
        <HeaderStock/>
        <StockDetails />
        <Purchases />
        <Sales />
      </div>
    </SidebarLayout>
  );
}

export default StockManagementPage;
