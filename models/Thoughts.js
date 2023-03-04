const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema (
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
        reactions: [
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

thoughtsSchema.virtuals('reactionCount').get(function () {
    return this.reactions.length;
})

const Thoughts = model('Thougths', thoughtsSchema);

module.exports = Thoughts;