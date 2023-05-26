const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction.js')

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                return new Date(date).toLocaleDateString()
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    { toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
},
);
ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});
const Thoughts = model('Thoughts', ThoughtsSchema);
module.exports = Thoughts;