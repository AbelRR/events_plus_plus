import React, { useState } from 'react';

import UpcomingOrder from './UpcomingOrder.jsx';

function UpcomingOrders({
  listOfOrders,
  getListOfOrders,
}) {
  return (
    <ul>
      {listOfOrders.value.map(order => (
        <UpcomingOrder
          orderObject={order}
          key={JSON.stringify(order)}
          getListOfOrders={getListOfOrders}
        />
      ))}
    </ul>
  );
}

export default UpcomingOrders;
