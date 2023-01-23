
const { Schema, model } = require('mongoose');

// schema object defines structure of collection
  // just like our thought and reaction js file

// create new schema object 
  // username field = type string
  // email field = type string
  
  // thoughts field 
    // array of objects
      // each object in the array has a single property of type which is set to objectID 

        // references the thought model --> creates relationship betwen user and thought
        // each user has an array of thought objectids
          // these objectids reference the document in the thoughts collection 
        // this relationship is called a population in mongoose

  // friends field
    // array of objects
      // each object  in the array has a single property of type which is set to objectID

      // objectId references user model --> creates relationship between different users
        // each user has an array of friends objects ids

// options added to object
    // toJson = documents from collection converted to JSON when returned from db
    // id field = will not be included when returned

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual property call friendCount
  // returns length of friends array

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// creates new model called user and the userschema we just created
  // the model is connected to the mondoDB collection with same name as the model

const User = model('User', userSchema);


module.exports = User;
