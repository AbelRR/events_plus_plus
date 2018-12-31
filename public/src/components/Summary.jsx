import React from 'react';
import axios from 'axios';

import EventDetails from './EventDetails.jsx';
import OrderDetails from './OrderDetails.jsx';

function Summary({
  newOrder,
  updatePageSelector,
  updateUserIndex,
  updatePhoneNumber,
  clientId,
}) {

  const updateOrderDetails = (e) => {
    e.preventDefault();
    axios.post('./orders', {
      dataObj: newOrder,
      _id: clientId,
    })
      .then((res) => {
        console.log(res);
        // update App.jsx './clients' data
      });
    updatePageSelector('newOrder');
    updateUserIndex(-1);
    updatePhoneNumber('(___) ___-____');
  };


  return (
    <div className="orderDetails">
      <h1> CONFIRM EVERYTHING IS CORRECT!</h1>
      <button type="button" onClick={e => updateOrderDetails(e)}>
        TEXT CONFIRMATION TO CLIENT & EMAIL NEW ORDER TO OWNER.
      </button>
    </div>
  );
}

export default Summary;

// ***************** TODO: ADD PROPTYPES ***************** //
