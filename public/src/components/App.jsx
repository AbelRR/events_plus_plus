import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PhoneField from './PhoneField.jsx';
import CheckForNewUser from './CheckForNewUser.jsx';
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
  axios.get('/clients')
    .then(success => success.data)
    .then(data => setData(data));
};

const currDate = new Date();
const startOfDay = (date) => {
  const year = date.getFullYear();
  const day = date.getUTCDate();
  const month = date.getMonth();
  return new Date(year, month, day);
};

export default function App() {
  const [userData, setUserData] = useState([]);
  const phoneNumber = useInputValue('');
  const currentNumberId = useInputValue(-1);
  const startOfDateRange = useInputValue(startOfDay(currDate));
  const rangeInWeeks = useInputValue(1);
  const listOfOrders = useInputValue([]);

  const getListOfOrders = () => {
    axios.get(`/orders/${startOfDateRange.value.getTime()}`)
      .then(res => res.data)
      .then(data => data.map(item => Object.assign({ phone: item.phone, clientId: item.clientId }, item.order)))
      .then(data => data.sort((a, b) => a.from - b.from))
      .then(data => listOfOrders.setValue(data));
  };

  useEffect(() => {
    getDataFromAPI(setUserData);
    getListOfOrders();
  }, []);

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
              getListOfOrders={getListOfOrders}
            />
          ))}
        </div>
      );
    } return (
      <div>
        <h1 className="title"> EVENTS++ </h1>
        <CheckForNewUser
          {...properties}
          getListOfOrders={getListOfOrders}
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
