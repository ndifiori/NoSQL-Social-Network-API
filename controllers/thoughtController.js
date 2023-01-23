
const { Thought, User } = require('../models');

// 1. getThoughts will GET all thoughts
  // sort them by creating date in descending order
  // then --> send the retrieved data back to client as json response

// 2. getSingleThought will GET one thought
  // find by ID passed through req.params
  // then --> send the retrieved data back to client as json response
    // if no data is present for that id return the message

// 3. createThought will make a POST request to create a thought
  // the req.body is the argument we are using to create a thought

    // .then will provide the new thought we created as the argument for the callback function
      // will find user by req.body.userId
      // update user thoughts by PUSH the id of the new thought we created to the thoughts array of the user document
      // new true will return updated document not original
    
    // .then will check if our updated document has an associated user and return a json request

    //.catch will catch any errors that occur in the request

// 4. updateThought will make a PUT request to update a thought
  // find thought from id from req.params 
  // update document using set and the data from the req.body
    // runValidators true = will ensure that the req.body is valid according to the schema

  // .then will check if the returned document is not null and if it isn't then it will return the data as a json object to the client

// 5. deleteThought will make a DELETE request to delete a single thought
  // will find one thought by id from req.params
  // .then will take the returned thought 
    // and use the find one and update
      // will find the thought by the id in the req.params
      // will pull the thought id from the thoughts array in the user thoughts field
  // .then will tell the client whether the thought had an associated user

// 6. addReaction will make a POST request to add a reaction
  // find a thought by an Id 
  // addtoSet will allow us to add a new reaction (to the thoughts reactions array) through the req.body
  // .then will send the updated thought to the client

// 7. removeReaction will make a DELETE request to delete a single reaction
  // finds a thought by it's id in the req.params
  // pulls (removes) reaction from the reaction array 


const thoughtController = {

  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then(( dbThoughtData ) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
   createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }

        res.json({ message: 'Thought successfully created!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

   updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }

        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

};

module.exports = thoughtController;
