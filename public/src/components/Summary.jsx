import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UpcomingOrder from './UpcomingOrder.jsx';

function Summary({
  newOrder,
  orderObject,
  updatePageSelector,
  updateUserIndex,
  updatePhoneNumber,
  clientId,
  listOfOrders,
}) {
  const updateOrderDetails = (e) => {
    e.preventDefault();
    axios.post('./orders', {
      dataObj: newOrder,
      _id: clientId,
    })
      .then(() => {
        console.log('new order:', newOrder);
        const currList = listOfOrders.value;
        listOfOrders.setValue([...currList, newOrder]);
      });
    updatePageSelector('newOrder');
    updateUserIndex(-1);
    updatePhoneNumber('(___) ___-____');
  };
  return (
    <div className="orderDetails">
      <h1> CONFIRM EVERYTHING IS CORRECT!</h1>
      <ul>
        <li>
          {JSON.stringify(orderObject)}
        </li>
        <UpcomingOrder orderObject={orderObject} />
      </ul>
      <button type="button" onClick={e => updateOrderDetails(e)}>
        TEXT CONFIRMATION TO CLIENT & EMAIL NEW ORDER TO OWNER.
      </button>
    </div>
  );
}

export default Summary;

// ***************** TODO: ADD PROPTYPES ***************** //
