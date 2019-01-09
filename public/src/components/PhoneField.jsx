import React /* , { useState } */ from 'react';
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';

// function getPhone(maskedPhoneNumber) {
//   return maskedPhoneNumber
//     .match(/\d+/g)
//     .join('');
// }

function currentPhoneNumber(targetVal, userData, currentNumberId) {
  const lastDigit = Number(targetVal[13]);
  currentNumberId.setValue(-1);
  let returnVal = targetVal;
  if (targetVal !== '(___) ___-____' && typeof lastDigit === 'number') {
    const oldTargetVal = targetVal;
    targetVal = targetVal.match(/\d+/g).join('');
    userData.forEach((client) => {
      const phone = client.phone
        .match(/\d+/g)
        .join('');
      const { _id } = client;
      if (Number(phone) === Number(targetVal)) {
        currentNumberId.setValue(_id);
      }
      console.log(targetVal, '**', oldTargetVal);
      returnVal = oldTargetVal;
      return oldTargetVal;
    });
  }
  return returnVal;
}

function PhoneField({
  phoneNumber,
  currentNumberId,
  userData,
}) {
  const setPhoneNumber = (targetVal, UserData, CurrentNumberId) => {
    phoneNumber.setValue(currentPhoneNumber(targetVal, UserData, CurrentNumberId));
  };

  return (
    <div className="order">
      <form>
        Phone Number:
        <NumberFormat
          className="phoneField"
          format="(###) ###-####"
          allowEmptyFormatting
          name="phone"
          mask="_"
          {...phoneNumber}
          onChange={(e) => {
            const { value: targetVal } = e.target;
            setPhoneNumber(targetVal, userData, currentNumberId);
          }}
          required
        />
      </form>
    </div>
  );
}

PhoneField.propTypes = {
  phoneNumber: PropTypes.objectOf(PropTypes.func).isRequired,
  currentNumberId: PropTypes.number.isRequired,
  userData: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default PhoneField;
