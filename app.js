
'use strict';

const express = require('express');

const app = express();

/// The connecting stage for the datastore
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();



/// Methods to get customer list and specifik customer when given a id
const getCustomers = () => {
  const query = datastore
    .createQuery('Customers');

  return datastore.runQuery(query);
};

const getCustomerWithId = (id) => {
  
  const query = datastore.createQuery('Customers').filter('ID', '=', id);

  return datastore.runQuery(query);
};


// MY API METHODS!!!!
app.get('/getCustomers', async (request, response, next) => {

  try {
    const [entities] = await getCustomers();
    response.send(entities)
  } catch (error) {
    next(error);
  }
});

app.get('/getCustomer', async (req, res, next) => {

  try {
    const [entity] = await getCustomerWithId(Number(req.query.id));
    res.send(entity[0])
  } catch (error) {
    next(error);
  }
});



const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`);
});


module.exports = app;
