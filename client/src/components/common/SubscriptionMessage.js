import React from 'react';
import { Link } from 'react-router-dom';


const SubscriptionMessage = ({noSubscriptionTitle,noSubscriptionMessage,subscribeNow,linkToSubscription}) => {
  return (
    <div className="p-5 border border-gray-300 rounded-lg bg-SidebarColor max-w-md mx-auto my-5 text-center">
      {/* Titre */}
      <h3 className="text-lg font-semibold text-darkBlue mb-2">
        {noSubscriptionTitle}
      </h3>

      {/* Message */}
      <p className="text-sm text-gray-600 mb-4">
        {noSubscriptionMessage}
      </p>

      {/* Bouton */}
      <Link to={linkToSubscription} className="px-4 py-2 bg-myGreen text-white rounded-md hover:bg-opacity-90 transition duration-300">
        {subscribeNow}
      </Link>
    </div>
  );
};

export default SubscriptionMessage;