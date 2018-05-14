const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var users = new Schema({
    id: {
        type: Number,
        index: true 
    },
    name: {
        type: String,
    },
    post: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    dateOfJoining: {
        type: Date,
        default: Date.now
    },
    contactNumber: {
        type: String
    },
    address: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email_id: {
        type: String
    },
    password: {
        type: String
    },
    username: {
        type: String
    },
    subject: [{
        name: {
            type: String,
            required: true
        },
        stream: {
            type: String
        },
        semester: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    attendance: [{
        type: Schema.Types.ObjectId,
        ref: 'Attendance'
    }]
});

module.exports = mongoose.model('User', users);
