const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;
const mongoURI = process.env.SERVER_DB_ADDRESS;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(mongoURI)
  .then(() => {
    console.log('mongoose connection');
  })
  .catch((err) => {
    console.log('DB connection fail', err);
  });

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});