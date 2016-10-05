// var passport = require("passport");
//
// var session = require("express-session");
// var users = require("./routes/users");
//
// passport.use(new Local(function (username, password, done) {
//   var verified = users.authenticate(username, password)
//   if (!verified){
//     done(null, false)
//   }
//   var user = users.find(username)
//   done(null, user)
// }))
//
// passport.serializeUser(function (user, done) {
//   done(null, user.username)
// })
//
// passport.deserializeUser(function (username, done) {
//   var user = users.find(username)
//   done(null, user)
// })
//
// module.exports = passport
