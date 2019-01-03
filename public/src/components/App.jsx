import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import moment from 'moment';

import PhoneField from './PhoneField.jsx';
import CheckForNewUser from './CheckForNewUser.jsx';
// import CurrentInventory from './Inventory.jsx';
// import UpcomingOrders from './UpcomingOrders.jsx';
// import UpcomingOrdersDate from './UpcomingOrdersDate.jsx';
import UpcomingOrdersComponent from './UpcomingOrdersComponent.jsx';

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };
};

const getDataFromAPI = (setData) => {
  // get clients
  axios.get('/clients')
    .then(success => success.data)
    .then(data => setData(data));
  // get upcoming orders
};

export default function App() {
  const [userData, setUserData] = useState([]);
  const phoneNumber = useInputValue('');
  const currentNumberId = useInputValue(-1);
  const startOfDateRange = useInputValue(new Date());
  const rangeInWeeks = useInputValue(1);
  const listOfOrders = useInputValue([]);

  useEffect(() => {
    getDataFromAPI(setUserData);

    axios.get(`/orders/${startOfDateRange.value.getTime()}`)
      .then(res => res.data)
      .then(data => data.map(item => Object.assign({ phone: item.phone }, item.order)))
      .then(data => data.sort((a, b) => a.from - b.from))
      .then((data) => {
        listOfOrders.setValue(data);
      });
  }, [listOfOrders.value]);

  const properties = {
    phoneNumber, currentNumberId, userData,
  };

  const transition = () => {
    const firstNumberIsNull = isNaN(Number(phoneNumber.value[1]));
    if (isNaN(Number(phoneNumber.value[13]))) {
      return (
        <div>
          <h1 className="title"> EVENTS++ </h1>
          <PhoneField {...properties} />
          {(!firstNumberIsNull ? <span /> : (
            <UpcomingOrdersComponent
              startOfDateRange={startOfDateRange}
              listOfOrders={listOfOrders}
              rangeInWeeks={rangeInWeeks}
            />
          ))}
        </div>
      );
    } return (
      <div>
        <h1 className="title"> EVENTS++ </h1>
        <CheckForNewUser
          {...properties}
          listOfOrders={listOfOrders}
        />
      </div>
    );
  };

  return (
    <div className="container">
      {transition()}
    </div>
  );
}
