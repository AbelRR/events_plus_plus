import React from 'react';

function EventDetails({
  eventDetails,
  updatePageSelector,
}) {
  const {
    chairs,
    tables,
    jumpers,
    canopies,
  } = eventDetails;

  const updateEventDetails = (e) => {
    e.preventDefault();
    updatePageSelector('orderDetails');
  };

  return (
    <div className="eventDetails">
      <form onSubmit={(e => updateEventDetails(e))}>
        <span>
          Tables:
          <input name="tables" type="number" className="formNumbersInput" onChange={e => tables.onChange(e)} required />
        </span>
        <br />
        <span>
          Chairs:
          <input name="chairs" type="number" className="formNumbersInput" onChange={e => chairs.onChange(e)} required />
        </span>
        <br />
        <span>
          Canopies:
          {/* Make Drop Down Options  */}
          <input name="canopies" type="text" onChange={e => canopies.onChange(e)} required />
        </span>
        <br />
        <span>
          Jumpers:
          {/* Make Drop Down Options  */}
          <input name="jumpers" type="text" onChange={e => jumpers.onChange(e)} required />
        </span>
        <br />
        <input className="submitButton" type="submit" value="Next" />
      </form>
    </div>
  );
}

export default EventDetails;

// ***************** TODO: ADD PROPTYPES ***************** //
