import React , {useState}from 'react';
import Header from './../../components/layout/Header';
import Offre from '../../components/OffersComponents/offre';
import ButtonLang from '../../components/common/Button/ButtonLang';
import {offersData} from '../../utils/Offers/offre'
import ButtonConfirm from '../../components/common/Button/ButtonConfirm';

const OffresPage = () => {

  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleCheckboxChange = (index) => {
    // If the checkbox is checked, set the selected offer
    setSelectedOffer(selectedOffer === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col gap-10">
      <Header />
      <ButtonLang/>
      <div className='ml-32 mt-14 mb-6 '>
        <p className='text-2xl font-bold '>Vous pouvez consulter nos offres ci-dessous</p>
        <p className='text-lg'>Choisissez ce qui vous convient</p>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center ">
        {offersData.map((offer, index) => (
          <Offre 
            key={index}
            text={offer.text}
            titre={offer.titre}
            description={offer.description}
            price={offer.price}
            isChecked={selectedOffer === index} // Pass checked state
            onCheckboxChange={() => handleCheckboxChange(index)} // Handle checkbox change
          />
        ))}
      </div>
      <div className='w-28 h-8 ml-[70%] mb-[10%]'>
        <ButtonConfirm text={"Submit"}/>
      </div>
    </div>
  );
};

export default OffresPage;
