const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.ObjectId,
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
        createAt: {
            type: Date,
            date: Date.now
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

module.exports = reactionSchema;