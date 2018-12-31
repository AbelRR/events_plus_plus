import React /* , { useState } */ from 'react';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import PlacesAutocomplete, {
  geocodeByAddress,
  // getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(address) {
    const { updateAddress } = this.props;
    this.setState({ address });
    updateAddress(address);
  }

  handleSelect(address) {
    geocodeByAddress(address)
      .then(results => this.handleChange(results[0].formatted_address))
      .catch(error => console.error('Error', error));
  }

  render() {
    const { address } = this.state;
    return (
      <PlacesAutocomplete
        value={address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Client Address',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
