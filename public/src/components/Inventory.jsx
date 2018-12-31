import React, { useState } from 'react';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function Inventory() {
  console.log('hello from Inventory.jsx');
  return (
    <div>
      <h2> Current Inventory for X - Business Day </h2>

      <h3> Chairs </h3>
      <h3> Tables </h3>
      <h3> Canopies </h3>
      <h3> Jumpers </h3>
      <h4> Jumper Banners </h4>
    </div>
  );
}

export default Inventory;
