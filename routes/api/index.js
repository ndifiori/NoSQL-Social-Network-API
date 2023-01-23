
// index router will be our parent router that combines our other 2 route files into a single router

// import express js router
// import user-routes 
// import thought-routes 

// set up routes for the users by mounting the imported routers at the /users path
// set up routes for the thoughts by mounting the imported routers at the /thoughts path

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('./users', userRoutes);
router.use('./thoughts', thoughtRoutes);

module.exports = router;




