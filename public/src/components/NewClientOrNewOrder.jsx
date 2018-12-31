import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  };

  const newOrder = {
    dateRangeObj,
    eventDetails,
    orderDetails,
  };

  if (pageSelector.value === 'newOrder') {
    if (clientId === -1) {
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
    return (
      <Summary
        newOrder={newOrder}
        updatePageSelector={pageSelector.setValue}
        clientObj={
          axios.get(`client/${clientId}`)
            .then(res => res.data[0])
        }
        updateUserIndex={updateUserIndex}
        updatePhoneNumber={phoneNumber.setValue}
        userData={userData}
        clientId={clientId}
      />
    );
  } if (pageSelector.value === 'newOrder') {
    return (
      <PhoneField
        phoneNumber={phoneNumber}
        currentNumberId={clientId}
        userData={
          axios.get('/clients')
            .then(success => success.data)
        }
      />
    );
  }
}

function NewClientOrNewOrder({
  clientId,
  phoneNumber,
  updateUserIndex,
  userData,
}) {
  return (
    <div>
      {selectingFunction(
        clientId,
        phoneNumber,
        updateUserIndex,
        userData,
      )}
    </div>
  );
}

export default NewClientOrNewOrder;

// ***************** TODO: ADD PROPTYPES ***************** //
