import React, { useState } from 'react';
import axios from 'axios';
import LocationSearchInput from './PlacesAutocomplete.jsx';

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    onChange: (e) => {
      const { value: targetVal } = e.target;
      setValue(targetVal);
    },
  };
};

function NewClientForm({
  phoneNumber,
  updateUserIndex,
  updatePageSelector,
}) {
  const name = useInputValue('');
  const address = useInputValue('');

  const newClient = {
    name: name.value,
    address: address.value,
    phone: phoneNumber.value,
    orders: [],
  };

  const postClient = () => {
    axios.post('/clients', newClient)
      .then(res => res.data)
      .then((data) => {
        const { _id } = data;
        console.log('submitted: ', _id);
        updateUserIndex(_id);
        updatePageSelector('datePicker');
        return _id;
      });
  };

  return (
    <div>
      <h1> ADD NEW CLIENT </h1>
      <p>{`${phoneNumber.value} => ${name.value} @ ${address.value}`}</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        postClient();
      }}
      >
        Name:
        <input name="name" type="text" onChange={e => name.onChange(e)} required />
        Address:
        <LocationSearchInput updateAddress={e => address.setValue(e)} required />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewClientForm;

// ***************** TODO: ADD PROPTYPES ***************** //
