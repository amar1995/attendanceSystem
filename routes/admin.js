const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const passportJwt = require('passport-jwt');
const User = require('../model/user');
const Attendance = require('../model/attendance');



router.patch('/:id/edit',(req,res) => {

    User.findOne({'id': req.params.id},(err,user) => {
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
                // console.log(body);
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


router.get('/:id/attendance', (req,res) => {
    let attendanceArray = [];
    const attendanceIds = req.params.id;
    // console.log(attendanceIds);
    for(let i=0;i< attendanceIds.length; i++)
    {
        Attendance.findById(attendanceIds[i],(err,result) => {
            attendanceArray.push(result);
            if(i === attendanceIds.length-1) 
            return res.send({
                success: true,
                msg: attendanceArray
            });
        });
    }
});

router.get('/:id/profile', (req,res) => {
    
    User.findOne({id: req.params.id}, (err,user) => {
        if(err) {
            return res.send({
                success: false,
                msg: 'Error to get user'
            });
        }
        if(!user) {
            return res.send({
                success: false,
                msg: 'User not found',
            });
        }
        return res.send({
            success: true,
            msg: user
        });
    });
    
});

router.get('/:id/attendance', (req,res) => {
    User.findOne({id: req.params.id}, (err,user) => {
        if(err) {
            return res.send({
                success: false,
                msg: 'Error to get user'
            });
        }
        if(!user) {
            return res.send({
                success: false,
                msg: 'User not found',
            });
        }
        let attendanceArray = [];
        const attendanceIds = user.attendance;
        // console.log(attendanceIds);
        for(let i=0;i< attendanceIds.length; i++)
        {
            Attendance.findById(attendanceIds[i],(err,result) => {
                attendanceArray.push(result);
                if(i === attendanceIds.length-1) 
                return res.send({
                    success: true,
                    msg: attendanceArray
                });
            });
        }
    });
});
module.exports = router;