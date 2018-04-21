const mongoose = require('mongoose');
const Attendance = require('../model/attendance');
const User = require('../model/user');




module.exports = function(id) {
    const present = true;
    const attendance = new Attendance({
        present
    });
    attendance.save();
    User.findOne({'id':id})
    .populate({
        path: 'attendance',
        select: ['present','dateOfEntering','dateOfLeaving'],
        model: 'Attendance'
    })
    .exec((err,user) => {
        if(err) return handleError(err);
        user.attendance.push(attendance._id);
        user.save(); 
        console.log(attendance);
    });
}