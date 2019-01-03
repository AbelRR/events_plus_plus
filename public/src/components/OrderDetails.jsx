import React from 'react';

import LocationSearchInput from './PlacesAutocomplete.jsx';

function OrderDetails({
  orderDetails,
  updatePageSelector,
}) {
  const {
    notes,
    contact,
    balanceOwed,
    orderLocation,
  } = orderDetails;

  const updateOrderDetails = (e) => {
    e.preventDefault();
    updatePageSelector('summary');
  };

  return (
    <div className="eventDetails">
      <form onSubmit={(e => updateOrderDetails(e))}>
        <span>
          Person of Contact:
          <input name="contact" type="text" onChange={e => contact.onChange(e)} required />
        </span>
        <br />
        <span>
          Notes:
          <input name="notes" type="text" onChange={e => notes.onChange(e)} required />
        </span>
        <br />
        <span>
          Order location:
          <LocationSearchInput updateAddress={e => orderLocation.setValue(e)} required />
        </span>
        <br />
        <span>
          Balance Owed:
          <input name="balanceOwed" type="number" className="formNumbersInput" onChange={e => balanceOwed.onChange(e)} required />
        </span>
        <br />
        <input className="submitButton" type="submit" value="Next" />
      </form>
    </div>
  );
}

export default OrderDetails;

// ***************** TODO: ADD PROPTYPES ***************** //
