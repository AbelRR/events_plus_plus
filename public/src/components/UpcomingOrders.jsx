import React from 'react';

import UpcomingOrder from './UpcomingOrder.jsx'; // how each order will take shape

function UpcomingOrders({
  listOfOrders,
}) {
  return (
    <ul>
      {listOfOrders.value.map((order, index) => (
        <UpcomingOrder
          orderObject={order}
          orderIndex={index}
          updateList={listOfOrders.setValue}
          key={JSON.stringify(order)}
        />
      ))}
    </ul>
  );
}

export default UpcomingOrders;
