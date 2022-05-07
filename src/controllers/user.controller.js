
const UserModel = require('../models/user.model');

// get users list
exports.getUserList = (req, res) => {
   // console.log('All users list');
   UserModel.getAllUsers((err, users) => {
       console.log('We Are All Here');
       if(err)
       res.send(err);
       console.log('Users', users);
       res.send(users)
   })
}

// get user by ID
exports.getUserByID = (req, res) => {
    // console.log('Get user by id');
    UserModel.getUserByID(req.params.id, (err, user) => {
        if(err)
        res.send(err);
        console.log('Single user data', user);
        res.send(user);
    })
}

// create new user
exports.createNewUser = (req, res) => {
    const userReqData = new UserModel(req.body);
    console.log('userReqData', req.body);
    // check null
    if(req.body.constructor === Object && Object.keys(reg.body.length) === 0) {
        res.send(400).send({success: false, message: 'Please fill all fields'});
    } else {
        UserModel.createUser(userReqData, (err, user) => {
            if(err)
            res.send(err);
            res.json({status: true, message: 'User created sucessfully', data: user})
        })
    }
}

// update user
exports.updateUser = () => {
    const userReqData = new UserModel(req.body);
    console.log('userReqData update', req.body);
    // check null
    if(req.body.constructor === Object && Object.keys(reg.body.length) === 0) {
        res.send(400).send({success: false, message: 'Please fill all fields'});
    } else {
        UserModel.updateUser(req.params.id, userReqData, (err, user) => {
            if(err)
            res.send(err);
            res.json({status: true, message: 'User updated sucessfully', data: user})
        })
    }
}

// delete User
exports.deleteUser = (req, res)=>{
    UserModel.deleteUser(req.params.id, (err, user) => {
        if(err)
        res.send(err);
        res.json({success:true, message: 'User deleted successully!'});
    })
}