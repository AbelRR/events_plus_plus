const businessData = {};

businessData.currentInventory = {
  tables: 80,
  chairs: 600,
  canopies: {
    small: 5,
    large: 5,
  },
  jumpers: {
    9: ['red/blue castle'],
    10: ['green/blue castle'],
    11: ['blue house', 'blue/red castle', 'red/yellow sports castle'],
    13: ['red/blue house', 'pink/purple castle', 'blue slide castle'],
  },
  jumperBanners: [
    'Super Mario',
    'SpiderMan',
    'Sports Balls',
    'Disney Princesses',
    'Disney Mickey Mouse',
    'Disney Tinker Bell',
    'Disney Cars',
  ],
};

businessData.drivers = [
  {
    _id: '1',
    name: 'Abel',
    phone: '(510) 111-1111',
    driversLicense: '5bd216481a',
  },
  {
    _id: '2',
    name: 'Edmundo',
    phone: '(510) 222-2222',
    driversLicense: '5bd216481a',
  },
  {
    _id: '3',
    name: 'Jose',
    phone: '(510) 333-3333',
    driversLicense: '5bd216481a',
  },
];

export default businessData;
