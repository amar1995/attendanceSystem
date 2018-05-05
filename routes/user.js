const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const Attendance = require('../model/attendance');


router.get('/profile',(req,res) => {
    // console.log(req.query.id);
    User.findOne({id:req.query.id}, (err,user) => {
        if(err)
        return res.send({
            success: false,
            msg: 'Something worng'
        });
        else if(!user)
        return res.send({
            success: false,
            msg: 'User not found'
        });
        else {
            
            res.send({
                success: true,
                msg: user
            });
        }
    });
});

router.post('/register', (req,res) => {
    const id = req.body.id;
    User.findOne({'id': id},(err,user) => {
        if(err)
        {
            return res.send({
                success: false,
                msg: 'Some Error Occured'
            });
        }
        else if(user.name) {
            return res.send({
                success: false,
                msg: 'User already present,You Can edit profile'
            });
        }
        else {
            require('../utils/objectExtracter')(req.body,
            ['name','email_id','dateOfBirth','dateOfJoining',
            'contactNumber','username','password','subject'])
            .then((body) => {
                for(let val in body){
                    user[val] = body[val];
                }
                bcrypt.hash(user.password, 10).then(function(hash) {
                    user.password=hash;
                    user.save().then((user)=>{
                        res.send({
                            success: true,
                            msg: 'Successfully Registered'
                        });
                    },(err) => {
                        res.send({
                            success: false,
                            msg: err
                        });
                    }).catch((e)=>{
                        res.json({
                            'success':false,
                            'msg':e
                        })
                    });
                });
            });
        }
    });
});

router.patch('/:id/edit',(req,res) => {
    const id = req.params.id;
    User.findOne({'id': id},(err,user) => {
        if(err)
        {
            return res.send({
                success: false,
                msg: 'Some Error Occured'
            });
        }
        else {
            require('../utils/objectExtracter')(req.body,
            ['name','email_id','dateOfBirth','dateOfJoining',
            'contactNumber','username','subject'])
            .then((body) => {
                
                for(let val in body){
                    user[val] = body[val];
                }
                console.log(body);
                user.save().then((user)=>{
                    res.send({
                        success: true,
                        msg: 'Successfully Editted'
                    });
                },(err) => {
                    res.send({
                        success: false,
                        msg: err
                    });
                }).catch((e)=>{
                    res.json({
                        'success':false,
                        'msg':e
                    })
                });
            });
        }
    });
});

router.post('/signup',(req,res) => {
    const id = req.body.id;
    const password = req.body.password;
    User.findOne({'id':req.body.id}, (err,user) => {
        if(err){
            return res.send({
                success: false,
                msg: 'User not found'
            });
        }
        bcrypt.compare(password, user.password).then(function(result) {
            if(result){
                return res.send({
                    success: true,
                    msg: 'SuccessFully SignIn'
                });
            }
            return res.send({
                success: false,
                msg: 'Password Invalid'
            });
        })
    });
});


router.post('/forget',(req,res) => {
    const email_id = req.body.email_id;
     //console.log(email_id);
    User.findOne({email_id:email_id}).then((user)=>{
        //console.log(user.username);
        const password=(require('./../utils/resetPassword.js')).mailTo(user.email_id,user.name);
        bcrypt.hash(password, 10).then(function(hash) {
            user.password=hash;
            user.save()
        });
        res.send({
            'success':true,
            'msg': 'Email Sent'
        });
    }).catch((err) => {
        console.log(err)
        res.json({
            'success':false,
            'msg':'User Not Found :('
        });
    });
});

function enrollUserId(id){
    const user = new User({
        id
    });
    user.save();
}

module.exports = {
    user: router,
    enrollUser: enrollUserId
};
