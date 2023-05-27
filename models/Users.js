const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {
        Username: {
            type: String,
            required: true,

        },
        Email: {
            type: String,
            required: true,
            unique: true, 
            // match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
// TODO: ADD A REGEX FOR THE MATCH EMAIL ON LINE 14
        },

        Thoughts: [ {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        },
        ],
        Friends: [ {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
        ],},
        {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }, 
);

UsersSchema.virtual('friendCount').get(function (){
    return this.Friends.length;
});

const Users =model('Users', UsersSchema)
module.exports = Users