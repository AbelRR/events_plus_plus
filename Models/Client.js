const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  from: Number,
  to: Number,
  delivered: Boolean,
  pickedUp: Boolean,
  event: {
    tables: Number,
    chairs: Number,
    canopies: String,
    jumpers: String,
  },
  contact: String,
  notes: String,
  balanceOwed: Number,
  orderLocation: String,
});

const clientSchema = mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  orders: [orderSchema],
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
