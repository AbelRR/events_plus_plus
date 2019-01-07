const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

const clients = require('../Controllers');

const app = express();

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
  (err) => {
    console.log(err || 'MongoDB connected');
  },
);
app.use(express.static(`${__dirname}/../public/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// REST CRUD:
app.get('/clients', (req, res) => {
  // clients.selectOrdersByClientId();
  clients.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/orders/:fromAndTo', (req, res) => {
  const { fromAndTo } = req.params;
  const vals = fromAndTo.split('-');
  const from = vals[0];
  const to = vals[1];
  clients.getUpcomingOrdersByStartDate(from, to, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.patch('/orders/:ids', (req, res) => {
  const { ids } = req.params;
  const vals = ids.split('-');
  const client = vals[0];
  const order = vals[1];
  clients.updateOrderStatus(client, order, (response) => {
    res.json(response);
  });
});

app.get('/client/:id', (req, res) => {
  const { id } = req.params;
  clients.selectById(id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/clients', (req, res) => {
  clients.newClient(req.body, (err, data) => {
    if (err) console.error('error: ', err);
    res.json(data);
  });
});

app.post('/orders', (req, res) => {
  const { dataObj, _id } = req.body;
  const {
    orderDetails, eventDetails, dateRangeObj,
  } = dataObj;

  const {
    contact, notes, balanceOwed, orderLocation,
  } = orderDetails;

  const {
    tables, chairs, canopies, jumpers,
  } = eventDetails;

  const {
    from, to,
  } = dateRangeObj;

  const shapedObj = {
    event: {
      tables: Number(tables.value),
      chairs: Number(chairs.value),
      canopies: canopies.value,
      jumpers: jumpers.value,
    },
    contact: contact.value,
    notes: notes.value,
    balanceOwed: Number(balanceOwed.value),
    orderLocation: orderLocation.value,
    from,
    to,
    delivered: false,
    pickedUp: false,
  };

  clients.addOrder(_id, shapedObj, (err, dataOne) => {
    if (err) console.error('error: ', _id, dataObj);
    clients.selectById(_id, (error, data) => {
      if (error) {
        res.sendStatus(500);
      } else {
        const lastOrder = data[0].orders[data[0].orders.length - 1];

        const {
          name, address, phone,
        } = data[0];

        const { _id: orderId } = lastOrder;

        const reshaped = {
          _id,
          orderId,
          name,
          address,
          phone,
          event: {
            tables: tables.value,
            chairs: chairs.value,
            canopies: canopies.value,
            jumpers: jumpers.value,
          },
          contact: contact.value,
          notes: notes.value,
          balanceOwed: balanceOwed.value,
          from,
          to,
          orderLocation: orderLocation.value,
        };

        res.json(reshaped);
        console.log(`${orderId} from ${_id}`);
      }
    });
  });
});

app.post('/textOrder', (req, res) => {
  const { phoneNumber, messageBody } = req.body;
  console.log('databody type: ', typeof req.body);
  console.log('toNumber', phoneNumber, 'body: ', messageBody);
  // res.send({ dataBODY: { phoneNumber, messageBody } });
  clients.messageCustomer(phoneNumber, messageBody, (messageData) => {
    // console.log(messageData);
    res.send(messageData);
  });
});

app.get('/lookupNumber/:phoneNumber', (req, res) => {
  const { phoneNumber } = req.params;
  console.log(phoneNumber);
  clients.lookupPhoneNumber(phoneNumber, (data) => {
    res.send(data);
    console.log(data);
  });
});

module.exports = {
  app,
};
