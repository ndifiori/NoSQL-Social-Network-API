
const { User, Thought } = require('../models');

// 1. getUsers will GET all users
  // select method is used to exclude ___v field (doc version) from the the returned data
  // .then return the data as a json object

// 2. getSingleUser will GET one user by userId in req.params
  // like above use select method
  // .populate method will populate friends fields of the returned user object
  // .populate method will populate thoughts fields of the returned user object
  // .then return the data as a json object along with a message to the client in case there is no matching userID

// 3. createUser will make a POST request to create a user
  // create a user through the req.body then return the data to the client as a json object

// 4. updateUser will make a PUT request to update a user
  // find the user by the id in the req.params
  // the set will update the data for the user by using the data from the req.body
    // run validators --> validators set on user model will run on new data before update
    // new true --> updated data will be returned
  // will show message to client if no user matches the id 

// 5. deleteUser will make a DELETE request to delete a user and their thoughts
  // find one user by the id in req.params
  // delete the match and if no data is found send message to client
  // if there was a user found (and deleted) then use the deleteMany method of the Thoughts model to delete all the associated thoughts
    // the in opearator matches the thoughts id with the thoughts id array of the deleted user

// 6. addFriend will make a POST request to add a friend 
  // find one user by the id in req.params
  // addToSet --> add friend id to user friends id array
  // return data to client as json object

// 7. removeFriend will make a DELETE request to delete a friend
  // find one  user by the id in req.params
  // pull --> remove the friend id from the users friend array
  // return data to client as json object and message if there is no matching userId

const userController = {

  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

   getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

   addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
}

module.exports = userController;