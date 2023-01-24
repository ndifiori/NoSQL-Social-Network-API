
// import express js router
// import the routes in the api folder

// set up routes for api by mounting imported routers at the /api path

// send message for any request that doesn't match any our routes

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;