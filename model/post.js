const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Schema = mongoose.Schema;

const posts = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    comments: [{
        comment: {
            type: String,
            required: true
        },
        user: {
            type: String,
        },
        timeOfComment: {
            type: Date,
            default: Date.now
        }
    }],
    images: [{
        name: String
    }]
});


module.exports = mongoose.model('Post',posts);