import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-date-picker';

function UpcomingOrdersDate({
  startOfDateRange,
  getListOfOrders,
}) {
  const { value } = startOfDateRange;
  const makeUpdates = (date) => {
    startOfDateRange.setValue(date);
    getListOfOrders();
    // const startInMilliseconds = startOfDateRange.value.getTime();
    // // numberOfWeeks in MS
    // axios.get(`/orders/${startInMilliseconds}`)
    //   .then(res => res.data)
    //   .then(data => data.map(item => Object.assign({ phone: item.phone }, item.order)))
    //   .then(data => data.sort((a, b) => a.from - b.from))
    //   .then(data => listOfOrders.setValue(data));
  };

  return (
    <DatePicker
      onChange={date => makeUpdates(date)}
      onActiveDateChange={({ activeStartDate, view }) => console('Changed view to: ', activeStartDate, view)}
      clearIcon={null}
      onClickDay={date => makeUpdates(date)}
      value={value}
      // minDate={new Date()}
    />
  );
}

UpcomingOrdersDate.propTypes = {
  startOfDateRange: PropTypes.objectOf(PropTypes.func).isRequired,
  getListOfOrders: PropTypes.func.isRequired,
};

export default UpcomingOrdersDate;
