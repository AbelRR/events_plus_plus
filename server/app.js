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

app.get('/orders/:fromDateInMilliseconds', (req, res) => {
  const { fromDateInMilliseconds } = req.params;
  clients.getUpcomingOrdersByStartDate(fromDateInMilliseconds, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
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

app.get('/lastOrder/:_id', (req, res) => {
  const { _id } = req.params;
  clients.selectById(_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const lastOrder = data[0].orders[data[0].orders.length - 1];
      const {
        name, address, phone,
      } = data[0];

      const {
        notes, balanceOwed, contact, from, to, event, orderLocation,
      } = lastOrder;

      const {
        tables, chairs, canopies, jumpers,
      } = event;

      const reshaped = {
        _id,
        name,
        address,
        phone,
        event: {
          tables,
          chairs,
          canopies,
          jumpers,
        },
        contact,
        notes,
        balanceOwed,
        from,
        to,
        orderLocation,
      };

      res.json(reshaped);
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
  };

  clients.updateOrder(_id, shapedObj, (err, dataOne) => {
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
