import React from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

import moment from 'moment';

function DateRangePicker({
  dateRange,
  updatePageSelector,
}) {
  // TODO: Refactor function to support upcoming orders component
  const updateOrderDate = (e) => {
    e.preventDefault();
    updatePageSelector('eventDetails');
  };
  // const dateRange = useInputValue([new Date(), new Date()]);
  return (
    <div>
      <h2> select days & time for PICKUP and DELIVERY </h2>
      {dateRange.value.map((date, index) => (index === 0
        ? (
          <p key={`${date}${index + 1}`} className="startDate">
            * delivery date and time:
            {' '}
            {moment(date).format('MMMM Do YYYY, h:mm a')}
          </p>
        )
        : (
          <p key={`${date}${index + 1}`} className="endDate">
            * pick-up date and time:
            {' '}
            {moment(date).format('MMMM Do YYYY, h:mm a')}
          </p>
        )))}
      <DateTimeRangePicker
        clearIcon={null}
        onChange={e => dateRange.setValue(e)}
        value={dateRange.value}
        minDate={new Date()}
        disableClock
        // isCalendarOpen
      />
      <button type="button" onClick={e => updateOrderDate(e)}>
        CLICK FOR EVENT DETAILS!
      </button>

    </div>
  );
}

export default DateRangePicker;

// ***************** TODO: ADD PROPTYPES ***************** //
