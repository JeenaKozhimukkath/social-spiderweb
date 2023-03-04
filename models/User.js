const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'must match an email address'],
    },
    thought: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friend: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
    getters: true,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friend.length;
  })

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
