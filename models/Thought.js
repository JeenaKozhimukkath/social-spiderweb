const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            date: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [
            reactionSchema, // reaction is the model
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

thoughtSchema.virtuals('reactionCount').get(function () {
    return this.reaction.length;
})

const Thought = model('Thougth', thoughtSchema);

module.exports = Thought;