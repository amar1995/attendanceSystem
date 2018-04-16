const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var users = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    attendance: [{
        type: Schema.Types.ObjectId,
        ref: 'Attendance'
    }],
    subject: [{
        type: Schema.Types.ObjectId,
        ref: 'Subjects'
    }]
});

module.exports = mongoose.model('User', users);
