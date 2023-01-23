const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// schema object defines structure of collection

// create new schema object 
  // thoughttext field = type string
  // createdAt field = date
  // username field = type string

  // reactions field 
    // array of reactionSchema object
    // represents reactions of thoughts

// options added to object
    // toJson = documents from collection converted to JSON when returned from db
    // id field = will not be included when returned

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// virtual property called reactionCount
  // virtual property = property calculated base on value of other properties but not stored in database
  // returns length of reactions array
    // aka the number of reactions associated with the thought

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// model object provides way to interact with specific collection
  // a model is a representation of mongoDb collection

// creates a new model called thought and the schema we just created
  // the new mongoose model is connected to the mongoDB collection with the same name as the model, thought
  
const Thought = model('Thought', thoughtSchema);


module.exports = Thought;
