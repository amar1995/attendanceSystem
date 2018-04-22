const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multiparty = require('connect-multiparty')();
const Gridfs = require('gridfs-stream');
const path = require('path');
const fs = require('fs');

const Notice = require('../model/notice');

router.get('/',(req,res) => {

});

router.post('/:isAdmin',multiparty,(req,res) => {
    if(req.params.isAdmin === "true"){
        var notices = new Notice({
            title: req.body.title,
            description: req.body.description
        });
        var db = mongoose.connection.db;
        var mongoDriver = mongoose.mongo;
        var gfs = new Gridfs(db, mongoDriver);
        var writestream = gfs.createWriteStream({
            filename: req.files.file.name,
            mode: 'w',
            content_type: req.files.file.type,
        });
        fs.createReadStream(req.files.file.path).pipe(writestream);
        writestream.on('close', function(file) {
            console.log(req.files.file.path);
            notices.pdfFile = file._id;
            fs.unlink(req.files.file.path, function(err) {
                // handle error
                if(err)
                res.send({
                    success: false,
                    msg: 'Problem in uploading file'
                });
                // console.log('success!')
            });
            notices.save().then(
                (notice)=>{
                    res.json({
                        'success':true,
                        msg: "SuccessFully registered"
                    });
                },
                (e)=>{
                    res.json({
                        success: false,
                        msg: e
                    })
            })
            .catch((e)=>{
                res.json({
                    success: false,
                    msg: e
                })
            })
        });
    }
    else
    res.send({
        success: false,
        msg: "You are not Admin, Post Can only be send by Admin"
    })
});

module.exports = router;