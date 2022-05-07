var dbConn = require('../../config/db.config');

var User = function (user) {
    this.id = user.id;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.password = user.password;
    this.phone = user.phone;
    this.address = user.address;
    this.is_admin = user.is_admin ? user.is_admin : true; 
}

// get all users
User.getAllUsers = (result) => {
    dbConn.query('SELCET * FROM Users', (err, res) => {
        if(err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    })
}

// get user by ID from DB
User.getUserByID = (id, result) => {
    dbConn.query('SELECT * FROM users WHERE id=?', id, (err, res) => {
        if(err) {
            console.log('Error while fetching user by id', err);
            result(null, err);
        } else {
            result(null,res);
        }
    })
}

// create new user
User.createUser = (userReqData, result) => {
    dbConn.query('INSERT INTO users SET ? ', userReqData, (err, res) => {
        if(err) {
            console.log('Error while inserting data');
            result(null, err);
        } else {
            console.log('User created successfully');
            result(null, res)
        }
    })
}

// update user
User.updateUser = (id, userReqData, result) => {
    dbConn.query('UPDATE users SET id=?, first_name=?, last_name=?, password=?, phone=?, address=?, is_admin=? WHERE id = ?', [userReqData.id, userReqData.first_name, userReqData.last_name, userReqData.password, userReqData.phone, userReqData.address, userReqData.is_admin], (err, res) =>{
      if(err) {
        console.log('Error while updating the user');
        result(null, err)
      } else {
          console.log('User updated successfully');
          result(null, res);
      }
    });
}

// delete user
User.deleteUser = (id, result)=>{
    // dbConn.query('DELETE FROM users WHERE id=?', [id], (err, res)=>{
    //     if(err){
    //         console.log('Error while deleting the user');
    //         result(null, err);
    //     }else{
    //         result(null, res);
    //     }
    // })
    dbConn.query("UPDATE users SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
        if(err){
            console.log('Error while deleting the user');
            result(null, err);
        }else{
            console.log("User deleted successfully");
            result(null, res);
        }
    });
}

module.exports = User;