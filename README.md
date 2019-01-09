

# Welcome to Events++ Official Repository

[![Events++ Video Demo & Motivation](https://i.imgur.com/RTdMB0C.png)](https://www.youtube.com/watch?v=A0aaiB7AqxI)
https://www.youtube.com/watch?v=A0aaiB7AqxI

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)

## Requirements

- Node 6.13.0
- Existing MongoDB Database with collection called 'clients'
- Twilio Account (including: phone number)

## Development
From within project root directory
CREATE .env file with following variables: 

```sh
'MONGODB_URI' // Connection to MongoDB Database
'ACCOUNT_SID' // Twilio Account SID
'AUTH_TWILIO' // Twilio Authentication Token
'TWILIO_PHONENUMBER' // Twilio Phone Number
```

### Installing Dependencies

From within the project root directory:

```sh
npm install -g webpack
npm install react@16.7.0-alpha.0 --save
npm install react-dom@16.7.0-alpha.0 --save
```

### Starting the project on your local machine

From within the project root directory:

```sh
npm start
npm run webpack-watch
```
Now open http://localhost:4000 on your browser. 

## Follow or connect with me on social sites :beers:
- [Twitter](https://twitter.com/Abel_Abel_34)
- [LinkedIn](linkedin.com/in/AbelRegalado)
