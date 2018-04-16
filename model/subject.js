const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subject = new Schema({
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
});

module.exports = mongoose.model('Subjects', subject);