import React from 'react';
import PropTypes from 'prop-types';

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

UpcomingOrders.propTypes = {
  listOfOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  getListOfOrders: PropTypes.func.isRequired,
};

export default UpcomingOrders;
