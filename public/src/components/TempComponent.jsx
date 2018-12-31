import React from 'react';
import moment from 'moment';

import UpcomingOrders from './UpcomingOrders.jsx';
import UpcomingOrdersDate from './UpcomingOrdersDate.jsx';

function temporaryComponent({
  startOfDateRange,
  listOfOrders,
  rangeInWeeks,
}) {
  return (
    <div>
      <span className="upcomingOrdersInfo">
        <hr />
        <h1> Upcoming Orders </h1>
        <br />
        <UpcomingOrdersDate
          startOfDateRange={startOfDateRange}
          listOfOrders={listOfOrders}
        />
        <p>
          FROM:
          {' '}
          {moment(startOfDateRange.value).format('MMMM Do YYYY')}
          {' '}
          to
          {' '}
          {moment(startOfDateRange.value).add(rangeInWeeks.value, 'weeks').format('MMMM Do YYYY')}
        </p>
        <span>
          # of Weeks:
          {' '}
          <input type="number" className="weeksInput" onChange={e => rangeInWeeks.onChange(e)} />
        </span>
      </span>
      <UpcomingOrders
        className="upcomingOrdersList"
        listOfOrders={listOfOrders}
      />
    </div>
  );
}

export default temporaryComponent;
