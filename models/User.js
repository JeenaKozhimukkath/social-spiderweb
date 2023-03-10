const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
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
    }
  
  },
  {
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
    return this.friend.length;
  })

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
