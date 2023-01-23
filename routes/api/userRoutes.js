
// import express js router

// import functions from the user-controller.js file
  // these functions will be used to handle routes for the user API

// this route is for /api/users
  // get request to this route to call the getUsers function 
  // post request to this route to call the createUser function

// this route is for /api/users/:userId
  // get request to this route to call the getSingleUSer function
  // put request to this route to call the updateUser function
  // delete request to this route to call the deleteUser function   

// this route is for /api/users/:userId/friends/:friendId
  // post request to this route to call the addFriend function
  // delete request to this route to call the removeFriend function

const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
