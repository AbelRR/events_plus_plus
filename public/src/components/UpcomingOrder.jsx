import React from 'react';
import axios from 'axios';
import moment from 'moment';

import ConfirmationButton from './ConfirmationButton.jsx';

const createMessage = (orderObject) => {
  const {
    event, from, to, balanceOwed, contact, phone, notes, orderLocation,
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

  return `NEW ORDER:
  ${contact}'s phone is: ${phone}.
  ${orderVariables} ADDRESS: ${orderLocation}. To be DELIVERED at ${moment(from).format('MMM Do, h:mm a')}, and PICKED-UP at ${moment(to).format('MMM Do, h:mm a')}. The REMAINING BALANCE is $${balanceOwed} Dollars. Additional Notes: ${notes}`;
};

function UpcomingOrder({
  orderObject,
  isSummary, // coming from <Summary />
  updateOrderDetails, // coming from <Summary />
  getListOfOrders,
}) {
  const updateDriverWithOrder = (e) => {
    e.preventDefault();
    const formattedPhone = '15103434956'; // `+1${String(driver.phone).match(/\d+/g).join('')}`;

    axios.post('/textOrder', { // TODO: change endpoint
      phoneNumber: formattedPhone,
      messageBody: createMessage(orderObject),
    });
  };

  const setOrderStatus = (e) => {
    const { _id, clientId } = orderObject;
    console.log(e.target.checked);
    console.log('orderId: ', _id);
    console.log('clientId: ', clientId);
    axios.patch(`/orders/${clientId}-${_id}`)
      .then(() => {
        getListOfOrders();
      });
  };

  return (
    <li>
      <div>
        <span className="fromLabel">
          FROM:
          {' '}
          {moment(orderObject.from).format('MMM Do YYYY, h:mm a')}
        </span>
        <span className="toLabel">
          TO:
          {' '}
          {moment(orderObject.to).format('MMM Do YYYY, h:mm a')}
        </span>
        <br />
        <span className="orderLocationLabel">
          Order Location:
          {' '}
          <a
            href={`https://maps.google.com/?q=${orderObject.orderLocation}`}
          >
            {orderObject.orderLocation}
          </a>
        </span>
      </div>
      <div>
        <span className="contactLabel">
          Contact:
          {' '}
          {orderObject.contact}
        </span>
        {' –––– '}
        <span className="phoneLabel">
          Phone:
          {' '}
          {orderObject.phone}
        </span>
      </div>
      <div>
        <span className="balanceLabel">
          Balance Owed:
          {' $'}
          {orderObject.balanceOwed}
        </span>
        {' –––– '}
        <span className="notesLabel">
          Order Notes:
          {' '}
          {orderObject.notes}
        </span>
      </div>
      <div className="eventLabels">
        <span className="chairsLabel">
          Chairs:
          {' '}
          {orderObject.event.chairs}
        </span>
        <br />
        <span className="tablesLabel">
          Tables:
          {' '}
          {orderObject.event.tables}
        </span>
        <br />
        {orderObject.event.canopies === ''
          ? <span />
          : (
            <span className="canopiesLabel">
              Canopies:
              {' '}
              {orderObject.event.canopies}
            </span>
          )
        }
        <br />
        {orderObject.event.jumpers === ''
          ? <span />
          : (
            <span className="jumpersLabel">
              Jumpers:
              {' '}
              {orderObject.event.jumpers}
            </span>
          )
        }
        <br />
      </div>
      {isSummary
        ? <span />
        : (
          <label>
            <input
              type="checkbox"
              checked={orderObject.pickedUp}
              onChange={e => setOrderStatus(e)}
            />
            {(orderObject.delivered
              ? ' Picked-up? '
              : ' Delivered? '
            )}
          </label>
        )
      }
      <ConfirmationButton
        isSummary={isSummary}
        updateOrderDetails={updateOrderDetails}
        updateDriverWithOrder={updateDriverWithOrder}
      />
    </li>
  );
}

export default UpcomingOrder;
