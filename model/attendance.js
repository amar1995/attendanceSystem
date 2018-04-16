import { modelNames } from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendance = new Schema({
    present: {
        type: boolean,
        default: false
    },
    time: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Attendance', attendance);