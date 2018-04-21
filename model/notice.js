const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Schema = mongoose.Schema;

const notice = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pdfFile: {
        type: String
    }
});


module.exports = mongoose.model('Notice',notice);