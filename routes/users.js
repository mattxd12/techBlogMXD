var express = require('express');
var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
var bcrypt = require('bcrypt')

var users=[]
var id = 0

function hashPassword (password) {
  return bcrypt.hashSync(password,10)
}

function findUser (username) {
  for (var i=0; i<users.length; i++){
    var user = users[i]
    if (user.user_name === user_name){
      return user
    }
  }
  return
}

function authenticateUser (user_name, password) {
  var user = findUser(user_name)
  if (!user) {
    return false
  }
  return bcrypt.compareSync(password, user.passwordHash)
}

function addUser (user_name, password) {
  if (!user_name || !password) {
    return false
  }
  if (findUser(user_name)){
    return false
  }
  var user = {
    user_name: user_name,
    passwordHash: hashPassword(password),
  }
    Users.insert(user)
    return true
}





module.exports = {
  find: findUser,
  authenticate: authenticateUser,
  add: addUser
}

// module.exports = router;
