import React from 'react';
import PropTypes from 'prop-types';

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

CheckForNewUser.propTypes = {
  phoneNumber: PropTypes.objectOf(PropTypes.func).isRequired,
  currentNumberId: PropTypes.objectOf(PropTypes.func).isRequired,
  userData: PropTypes.objectOf(PropTypes.func).isRequired,
  getListOfOrders: PropTypes.func.isRequired,
};

export default CheckForNewUser;
