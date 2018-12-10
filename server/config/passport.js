var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    bcrypt = require('bcrypt-nodejs'); 

module.exports = function (passport) {
    var db = new sqlite3.Database(__dirname + '/../../database/flowers.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.log(err);
        }
        else{
            console.log('Connected to flowers database')
        }
      });


    //This is for the local signup function

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            process.nextTick(function () {
                //Find the user whose email was passed into the function
                console.log('got into sign in function')

               db.get('SELECT username FROM  users WHERE username = ?', [username], function (err, row) {
                    if (err) {
                        console.log(err);
                        return done(err, req.flash(err));//Sends the error that occured as a flash message
                    }
                    if (row) {//If the user already exists
                        console.log('user exists');
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {//Create the new User
                        console.log('made it into the create')
                        db.run(`INSERT INTO users(username, password, first_name, last_name) VALUES(?,?,?,?)`, [username, bcrypt.hashSync(password, bcrypt.genSaltSync(8),null), req.body.firstName, req.body.lastName], function(err){
                            if(err)
                                console.log(err);
                                return done(null, row);

                        });
                    }
                });
            });
        }));

    //TODO: Add local login function
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            db.get('SELECT password FROM users WHERE username = ?',[username], function (err, row) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (!row) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                db.get('SELECT username, password, id FROM users WHERE username = ?', [username], function(err,row) {
                    if(!bcrypt.compareSync(password, row.password)){
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password')); 
                    }
                    console.log(row);
                    return done(null, row);
                });
            });
        }));

        passport.serializeUser(function (user, done) {
            console.log(user);
             done(null, user.id);
        });
    
        passport.deserializeUser(function (id, done) {
            db.get('SELECT id, username FROM users WHERE id = ?', [id], function(err, row) {
                if (!row) 
                    done(null, false);
    
                 done(null, row);
              });
        });
};
