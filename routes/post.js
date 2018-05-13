const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multiparty = require('connect-multiparty')();
const Gridfs = require('gridfs-stream');
const path = require('path');
const fs = require('fs');

const Post = require('../model/post');


function myritestream(files,file)
{
    const db = mongoose.connection.db ? mongoose.connection.db : 'AttendanceSystem';
    const mongoDriver = mongoose.mongo;
    const gfs = new Gridfs(db,mongoDriver);
    return new Promise((resolve) => {
        var writestream = gfs.createWriteStream({
            filename: files[file].name,
            mode: 'w',
            content_type: files[file].type,
        });
        fs.createReadStream(files[file].path).pipe(writestream);
        writestream.on('close', function(result) {
            // console.log(result);
            fs.unlink(files[file].path, function(err) {
                // handle error
                if(err) 
                error =  err;
            });
            resolve({'name': result._id});
        });
    })
}

const fileSavingUsingGrid = async function(files,arrayObject){
    
    let error;
    for(let file in files) {
        // console.log(files[file])
        arrayObject.push(await myritestream(files,file));
        // var writestream = gfs.createWriteStream({
        //     filename: files[file].name,
        //     mode: 'w',
        //     content_type: files[file].type,
        // });
        // fs.createReadStream(files[file].path).pipe(writestream);
        // writestream.on('close', function(result) {
        //     // console.log(result);
        //     arrayObject.push({'name': result._id});
        //     fs.unlink(files[file].path, function(err) {
        //         // handle error
        //         if(err) 
        //         error =  err;
        //     });
        //     console.log(arrayObject);
        // });
    }
    return arrayObject
}
router.get('/:id',(req,res) => {
   // console.log(req.query);
    console.log(req.params);  
    Post.findById("5adbaa710b686c1e8819a2a6", (err,result) => {
        const db = mongoose.connection.db ? mongoose.connection.db : 'AttendanceSystem';
        const mongoDriver = mongoose.mongo;
        const gfs = new Gridfs(db,mongoDriver);
        // console.log(req.params.id);
        var readstream = gfs.createReadStream({
            _id: req.rawHeaders[11]
         });
         readstream.pipe(res);
        
    });
});

router.get('/',(req,res) => {
    Post.find({},(err,result) => {
        res.send({
            msg: result
        })
    })
});

router.post('/',multiparty,(req,res) => {
    console.log(req.body.isAdmin);
    if(req.body.isAdmin === "true"){
        require('../utils/objectExtracter')(req.body,['title','description'])
        .then((body) => {
            var posts = new Post(body);
            var  arrayObject = [];
            fileSavingUsingGrid(req.files,arrayObject)
            .then((file) => {
                posts.images = file;
                posts.save();
                res.send({
                    success: true,
                    msg: "Post uploaded"
                });
            },(err) => {
                console.log(err);
                return res.send({
                    success: false,
                    msg: "Problem in uploading files"
                });
            });
        })
        
       // console.log(req);
    }
    else
    res.send({
        success: false,
        msg: "You are not Admin, Post Can only be send by Admin"
    })
});

module.exports = router;