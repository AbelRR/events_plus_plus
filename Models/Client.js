const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  from: Number,
  to: Number,
  event: {
    tables: Number,
    chairs: Number,
    canopies: String,
    jumpers: String,
  },
  contact: String,
  notes: String,
  balanceOwed: Number,
});

const clientSchema = mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  orders: [orderSchema],
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
