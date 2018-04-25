const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {userRepository} = require('../repositories');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  userRepository.findOne({ where: {id: id}})
  .then(user => {
    done(null, user);
  });
});

passport.use(
  'login',
  new LocalStrategy(
    {passReqToCallback : true},
    function(req, username, password, done) { 
      // check in mongo if a user with username exists or not
      userRepository.findOne({ where: {username}})
        .then(user => {
          
          // Username does not exist, log error & redirect back
          if (!user){
            console.log('User Not Found with username '+username);
            return done(null, false);                 
          }
          // User exists but wrong password, log the error 
          if (!isValidPassword(user, password)){
            console.log('Invalid Password');
            return done(null, false, 
                req.flash('message', 'Invalid Password'));
          }
          // User and password both match, return user from 
          // done method which will be treated like success
          return done(null, user);
        }
      );
  })
);

function isValidPassword(user, password) {
    return user.password === password;
}
  /*
  app.get('/signup', function(req, res){
    res.end('register');
  });
  
  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/api/users',
    failureRedirect: '/signup',
    failureFlash : true 
  }));
  */

function requireLogin(req, res, next) {
  if (req.originalUrl === '/login' || req.user) {
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect("/login"); // or render a form, etc.
  }
}

module.exports.auth = requireLogin;
module.exports.login = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true 
  });