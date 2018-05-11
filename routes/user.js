const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const passportJwt = require('passport-jwt');
const User = require('../model/user');
const Attendance = require('../model/attendance');


const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret hai bro'
}

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    // console.log(jwt_payload);
    User.findOne({id:jwt_payload.id}, (err, user) => {
        if (err) {
            // console.log("Error :- "+ err);
            return done(err, false);
        }
        if (user) {
            // console.log("User :- "+ user);
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

router.get('/profile',passport.authenticate('jwt',{session:false}),
    (req,res) => {
    // console.log(req.query.id);
    // console.log(req);
    // console.log(req);
    res.send({
        success: true,
        msg: req.user
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
                        const token = jwt.sign({ id: user.id},jwtOptions.secretOrKey,{
                            expiresIn: 86400
                        });
                        res.send({
                            success: true,
                            msg: 'Successfully Registered',
                            token: token
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

router.patch('/:id/edit',passport.authenticate('jwt',{session:false}),(req,res) => {

    User.findOne({'id': req.id},(err,user) => {
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

router.post('/signup',(req,res) => {
    const id = req.body.id;
    const password = req.body.password;
    User.findOne({'id':req.body.id}, (err,user) => {
        if(err) {
            return res.send({
                success: false,
                msg: 'User not found'
            });
        }
        if(!user) {
            return res.send({
                success: false,
                msg: 'User not found'
            });
        }
        bcrypt.compare(password, user.password).then(function(result) {
            if(result){
                const token = jwt.sign(
                    {id: user.id, isAdmin: user.isAdmin},
                    jwtOptions.secretOrKey,
                    {
                        expiresIn: 86400
                    }
                )
                return res.send({
                    success: true,
                    msg: 'SuccessFully SignIn',
                    token: token
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
        // console.log(err)
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
