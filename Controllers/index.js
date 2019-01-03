const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TWILIO;
const twilioClient = require('twilio')(accountSid, authToken);

const Client = require('../Models/Client');
require('dotenv').config();

// TODO: UPDATE API FUNCTION NAMES TO *RESTful Function Names*

module.exports = {

  selectAll: (callback) => {
    Client.find({}, '_id name address phone orders', (err, items) => {
      if (err) return callback(err, null);
      callback(null, items);
    });
  },
  // get all clients
  selectOneByPhoneNumber: (phone, callback) => {
    Client.find({ phone }, '_id name address phone orders', (err, items) => {
      if (err) return callback(err, null);
      callback(null, items);
    });
  },

  selectById: (_id, callback) => {
    Client.find({ _id }, '_id name address phone orders', (err, items) => {
      if (err) return callback(err, null);
      callback(null, items);
    });
  },

  getUpcomingOrdersByStartDate: (fromDateInMilliseconds, callback) => {
    Client.find({}, (err, items) => {
      if (err) return callback(err, null);
      const arrOfOrders = [];
      items.forEach((person) => {
        person.orders.forEach((order) => {
          if (order.from >= fromDateInMilliseconds - 64800000) {
            arrOfOrders.push({
              phone: person.phone,
              order,
            });
          }
        });
      });
      return callback(null, arrOfOrders);
    });
  },

  // Add Client/User Information
  newClient: (dataObj, callback) => {
    const client = new Client(dataObj);
    client.save().then((returnedClient) => {
      callback(null, returnedClient);
    }).catch((error) => {
      callback(error);
    });
  },

  // Update Existing Client with Order/Event Information
  updateOrder: (_id, newOrder, callback) => {
    Client.findOneAndUpdate({ _id }, {
      $push: {
        orders: newOrder,
      },
    }, (err, data) => {
      if (err) callback(err);
      callback(null, data);
    });
  },

  messageCustomer: (toNumber, messageBody, callback) => {
    twilioClient.messages
      .create({
        from: '+15103691008',
        body: messageBody,
        to: toNumber,
      })
      .then(message => callback(message))
      .done();
  },

  lookupPhoneNumber: (clientNumber, callback) => {
    twilioClient.lookups.phoneNumbers(`+1${clientNumber}`)
      .fetch({ type: 'caller-name' })
      .then(() => callback(true))
      .catch(() => callback(false))
      .done();
  },

};
