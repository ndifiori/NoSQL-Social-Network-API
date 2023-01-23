
// import express js router

// import functions from the thought-controller.js file
  // these functions will be used to handle routes for the thought API

  // this route is for /api/thoughts
    // get request to this route to call the getThoughts function
    // post request to this route to call the createThought function

  // this route is for the /api/thoughts/:thoughtId
    // get request to this route to call the getSingleThought function 
    // put request to this route to call the updateThought function
    // delete request to this route to call the deleteThought function

  // this route is for the /api/thoughts/:thoughtId/reactions
    // post request to this route to call the addReaction function

  // this route is for  the /api/thoughts/:thoughtId/reactions/:reactionId
    // delete request to this route to call the removeReaction function  

const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;