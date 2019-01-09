import React from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';

import UpcomingOrder from './UpcomingOrder.jsx';

const createMessage = (orderObject) => {
  const {
    event, from, to, balanceOwed, contact, orderLocation,
  } = orderObject;
  const {
    tables, chairs, canopies, jumpers,
  } = event;

  let orderVariables = '';
  if (tables > 0) {
    orderVariables += `${tables} tables. `;
  } if (chairs > 0) {
    orderVariables += `${chairs} chairs. `;
  } if (canopies !== '') {
    orderVariables += `${canopies} canopies. `;
  } if (jumpers !== '') {
    orderVariables += `${jumpers} jumpers. `;
  }

  return `Hi, ${contact}, you ordered: ${orderVariables} Your order will delivered at: ${orderLocation} around ${moment(from).format('MMM Do, h:mm a')}, and picked up at ${moment(to).format('MMM Do, h:mm a')}. Your remaining balanace is $${balanceOwed} Dollars.`;
};

function Summary({
  newOrder,
  orderObject,
  updatePageSelector,
  updateUserIndex,
  updatePhoneNumber,
  clientId,
  getListOfOrders,
}) {
  const updateOrderDetails = (e) => {
    e.preventDefault();
    axios.post('./orders', {
      dataObj: newOrder,
      _id: clientId,
    })
      .then(() => {
        const formattedPhone = `+1${String(orderObject.phone).match(/\d+/g).join('')}`;
        axios.post('/textOrder', {
          phoneNumber: formattedPhone,
          messageBody: createMessage(orderObject),
        });
        getListOfOrders();
      });

    updatePageSelector('newOrder');
    updateUserIndex(-1);
    updatePhoneNumber('(___) ___-____');
  };
  return (
    <div className="orderDetails">
      <h2> CONFIRM EVERYTHING IS CORRECT!</h2>
      <ul>
        <UpcomingOrder
          orderObject={orderObject}
          updateOrderDetails={updateOrderDetails}
          isSummary
        />
      </ul>
    </div>
  );
}

Summary.propTypes = {
  newOrder: PropTypes.objectOf(PropTypes.func).isRequired,
  orderObject: PropTypes.objectOf(PropTypes.func).isRequired,
  updatePageSelector: PropTypes.func.isRequired,
  updateUserIndex: PropTypes.func.isRequired,
  updatePhoneNumber: PropTypes.func.isRequired,
  clientId: PropTypes.objectOf(PropTypes.func).isRequired,
  getListOfOrders: PropTypes.func.isRequired,
};

export default Summary;
