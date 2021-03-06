import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import NewClientForm from './NewClientForm.jsx';
import DateRangePicker from './DateRangePicker.jsx';
import EventDetails from './EventDetails.jsx';
import OrderDetails from './OrderDetails.jsx';
import Summary from './Summary.jsx';
import PhoneField from './PhoneField.jsx';

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    onChange: (e) => {
      const { value: targetVal } = e.target;
      setValue(targetVal);
    },
  };
};

function selectingFunction(
  clientId,
  phoneNumber,
  updateUserIndex,
  userData = [],
  getListOfOrders,
) {
  const pageSelector = useInputValue('newOrder');
  const dateRange = useInputValue([new Date(), new Date()]);
  const tables = useInputValue(0);
  const chairs = useInputValue(0);
  const canopies = useInputValue('');
  const jumpers = useInputValue('');
  const notes = useInputValue('');
  const balanceOwed = useInputValue(0);
  const contact = useInputValue('');
  const orderLocation = useInputValue('');
  const order = {};

  const eventDetails = {
    tables,
    chairs,
    canopies,
    jumpers,
  };

  const dateRangeObj = {
    from: dateRange.value[0].getTime(),
    to: dateRange.value[1].getTime(),
  };

  const orderDetails = {
    notes,
    balanceOwed,
    contact,
    orderLocation,
  };

  const newOrder = {
    dateRangeObj,
    eventDetails,
    orderDetails,
  };

  if (pageSelector.value === 'newOrder') {
    console.log('1');
    if (clientId === -1) {
      console.log('2');
      return (
        <NewClientForm
          phoneNumber={phoneNumber}
          updateUserIndex={updateUserIndex}
          updatePageSelector={pageSelector.setValue}
        />
      );
    } pageSelector.value = 'datePicker';
  } if (pageSelector.value === 'datePicker') {
    return (
      <DateRangePicker
        dateRange={dateRange}
        updatePageSelector={pageSelector.setValue}
      />
    );
  } if (pageSelector.value === 'eventDetails') {
    return (
      <EventDetails
        eventDetails={eventDetails}
        updatePageSelector={pageSelector.setValue}
      />
    );
  } if (pageSelector.value === 'orderDetails') {
    return (
      <OrderDetails
        orderDetails={orderDetails}
        updatePageSelector={pageSelector.setValue}
        clientObj={
          axios.get(`client/${clientId}`)
            .then(res => res.data[0])
        }
      />
    );
  } if (pageSelector.value === 'summary') {
    order.phone = phoneNumber.value;
    order.from = dateRangeObj.from;
    order.to = dateRangeObj.to;
    order.event = {
      chairs: eventDetails.chairs.value,
      tables: eventDetails.tables.value,
      jumpers: eventDetails.jumpers.value,
      canopies: eventDetails.canopies.value,
    };
    order.balanceOwed = orderDetails.balanceOwed.value;
    order.contact = orderDetails.contact.value;
    order.notes = orderDetails.notes.value;
    order.orderLocation = orderDetails.orderLocation.value;

    return (
      <Summary
        newOrder={newOrder}
        orderObject={order}
        updatePageSelector={pageSelector.setValue}
        updateUserIndex={updateUserIndex}
        updatePhoneNumber={phoneNumber.setValue}
        clientId={clientId}
        getListOfOrders={getListOfOrders}
      />
    );
  }
}

function NewOrderForm({
  clientId,
  phoneNumber,
  updateUserIndex,
  userData,
  getListOfOrders,
}) {
  return (
    <div>
      {selectingFunction(
        clientId,
        phoneNumber,
        updateUserIndex,
        userData,
        getListOfOrders,
      )}
    </div>
  );
}


NewOrderForm.propTypes = {
  clientId: PropTypes.number.isRequired,
  phoneNumber: PropTypes.func.isRequired,
  updateUserIndex: PropTypes.func.isRequired,
  userData: PropTypes.objectOf(PropTypes.func).isRequired,
  getListOfOrders: PropTypes.func.isRequired,
};
export default NewOrderForm;

// ***************** TODO: ADD PROPTYPES ***************** //
