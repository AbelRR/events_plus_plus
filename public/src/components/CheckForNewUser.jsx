import React, { useState } from 'react';

// import NewClientForm && ConfirmClient
import NewOrderForm from './NewOrderForm.jsx';

// function getPhone(maskedPhoneNumber) {
//   return maskedPhoneNumber
//     .match(/\d+/g)
//     .join('');
// }

function CheckForNewUser({
  phoneNumber,
  currentNumberId,
  userData,
  getListOfOrders,
}) {
  const lastDigit = Number(phoneNumber.value[13]);
  let displayValue;

  // TODO: instead: use Twilio.Lookup to verify phoneNumber is a valid US Phone Number
  // if (isNaN(lastDigit) || phoneNumber.value === '(___) ___-____') {
  //   displayValue = 'Enter valid US Phone Number.';
  // } else 
  if (typeof lastDigit === 'number') {
    const userIndex = currentNumberId.value;
    const updateUserIndex = currentNumberId.setValue;
    displayValue = (
      <NewOrderForm
        phoneNumber={phoneNumber}
        clientId={userIndex}
        updateUserIndex={updateUserIndex}
        userData={userData}
        getListOfOrders={getListOfOrders}
      />
    );
  }

  return (
    <div className="order">
      {displayValue}
    </div>
  );
}

export default CheckForNewUser;
