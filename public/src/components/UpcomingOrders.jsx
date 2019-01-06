import React, { useState } from 'react';

import UpcomingOrder from './UpcomingOrder.jsx';

function UpcomingOrders({
  listOfOrders,
}) {
  return (
    <ul>
      {listOfOrders.value.map(order => (
        <UpcomingOrder
          orderObject={order}
          key={JSON.stringify(order)}
        />
      ))}
    </ul>
  );
}

export default UpcomingOrders;
