import React from 'react';
import moment from 'moment';

import UpcomingOrders from './UpcomingOrders.jsx';
import UpcomingOrdersDate from './UpcomingOrdersDate.jsx';

function UpcomingOrdersComponent({
  startOfDateRange,
  listOfOrders,
  rangeInWeeks,
  getListOfOrders,
  clientId,
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
        <span>
          # of Weeks:
          {' '}
          <input type="number" className="weeksInput" onChange={e => rangeInWeeks.onChange(e)} />
        </span>
        <p>
          FROM:
          {' '}
          {moment(startOfDateRange.value).format('MMMM Do YYYY')}
          {' '}
          to
          {' '}
          {moment(startOfDateRange.value).add(rangeInWeeks.value, 'weeks').format('MMMM Do YYYY')}
        </p>
      </span>
      <UpcomingOrders
        className="upcomingOrdersList"
        listOfOrders={listOfOrders}
        getListOfOrders={getListOfOrders}
      />
    </div>
  );
}

export default UpcomingOrdersComponent;
