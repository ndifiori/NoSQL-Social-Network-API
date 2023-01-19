const { Schema, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat')

// create a new schema object called reaction schema
  // reactionId field 
    // Types.objectID constructor which creates an unique id
  // reactionBody field
    // type = string
  // username field
    // type = string
  // createdAt field
    // date with getter function

  // options added to object
    // toJson = documents from collection converted to JSON when returned from db
    // id field = will not be included when returned
 
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String, 
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = reactionSchema;
