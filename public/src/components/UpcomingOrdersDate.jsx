import React from 'react';
import axios from 'axios';

import DatePicker from 'react-date-picker';

function UpcomingOrdersDate({
  startOfDateRange,
  listOfOrders,
}) {
  const { value } = startOfDateRange;
  const makeUpdates = (date) => {
    startOfDateRange.setValue(date);

    axios.get(`/orders/${startOfDateRange.value.getTime()}`)
      .then(res => res.data)
      .then(data => data.map(item => Object.assign({ phone: item.phone }, item.order)))
      .then(data => data.sort((a, b) => a.from - b.from))
      .then(data => listOfOrders.setValue(data));
  };

  return (
    <DatePicker
      onChange={date => makeUpdates(date)}
      value={value}
      minDate={new Date()}
    />
  );
}

export default UpcomingOrdersDate;
