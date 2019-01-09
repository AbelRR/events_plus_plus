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
  return new Date(year, month, day - 1); // UTC is 14hours ahead of Pacific Time
};

export default function App() {
  const [userData, setUserData] = useState([]);
  const phoneNumber = useInputValue('');
  const currentNumberId = useInputValue(-1);
  const startOfDateRange = useInputValue(startOfDay(currDate));
  const rangeInWeeks = useInputValue(1);
  const listOfOrders = useInputValue([]);
  const deliveredFilter = useInputValue(false);
  const pickedUpFilter = useInputValue(false);

  const getListOfOrders = () => {
    const startInMilliseconds = startOfDateRange.value.getTime();
    const weekInMilliseconds = 604800000;
    const endInMilliseconds = startInMilliseconds + (rangeInWeeks.value * weekInMilliseconds);
    axios.get(`/orders/${startInMilliseconds}-${endInMilliseconds}`)
      .then(res => res.data)
      .then(data => data.map(item => Object.assign(
        { phone: item.phone, clientId: item.clientId },
        item.order,
      )).filter((item) => {
        const delivered = deliveredFilter.value;
        const pickedUp = pickedUpFilter.value;
        if (delivered === false
            && pickedUp === false) {
          return item;
        }
        if (delivered === true
          && pickedUp === false) {
          return item.delivered;
        }
        if (delivered === true
          && pickedUp === true) {
          return item.delivered && item.pickedUp;
        }
        return item;
      }))
      .then(data => data.sort((a, b) => a.from - b.from))
      .then(data => listOfOrders.setValue(data));
  };

  useEffect(() => {
    getDataFromAPI(setUserData);
  }, []);

  useEffect(() => {
    getListOfOrders();
  }, [deliveredFilter.value]);

  useEffect(() => {
    getListOfOrders();
  }, [pickedUpFilter.value]);

  useEffect(() => {
    if (deliveredFilter.value === false
      && pickedUpFilter.value === true) {
      alert('AGH! Delivered must be also set to true!!!');
      pickedUpFilter.setValue(false);
    }
  });

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
              deliveredFilter={deliveredFilter}
              pickedUpFilter={pickedUpFilter}
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
