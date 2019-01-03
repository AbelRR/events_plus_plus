import React from 'react';
import moment from 'moment';

function UpcomingOrder({
  orderObject,
}) {
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
      <label>
        <input
          type="checkbox"
          // checked="{props.isConfirmed}"
          // onChange="{props.handleConfirmation}"
        />
        {(orderObject.delivered
          ? ' Picked-up? '
          : ' Delivered? '
        )}
      </label>
      <button type="button">
        REMIND DRIVER!
      </button>
    </li>
  );
}

export default UpcomingOrder;
