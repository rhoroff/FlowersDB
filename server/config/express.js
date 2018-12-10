var path = require('path');
express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    sqlite3 = require('sqlite3').verbose();


module.exports.init = function() {

    var db = new sqlite3.Database(__dirname + '/../../database/flowers.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.log(err);
        }
        else{
            console.log('Connected to flowers database')
        }
      });
      db.serialize(function() {
          db.run(`
          CREATE TABLE IF NOT EXISTS users(
              "id" INTEGER PRIMARY KEY AUTOINCREMENT,
              "username" TEXT,
              "password" TEXT NOT NULL,
              "first_name" TEXT NOT NULL,
              "last_name" TEXT NOT NULL
          )
          `);
      });

      require('./passport')(passport)//passes passport for configuration

      //initialize app
      var app = express();
    
      //enable request logging for development debugging
      app.use(morgan('dev'));
      //body parsing middleware
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
    
      app.use(cookieParser()); // read cookies (needed for auth)
      
    
    //Paspport configuration
    app.use(session({ secret : 'secretsession' , resave: true, saveUninitialized: true}));//Not sure what having a secret session does yet but we will see
    app.use(passport.initialize());
    app.use(passport.session()); //Persistent login sessions
    app.use(flash());// message storing in session?
    
    require('../routes/authentication.routes.js')(app, passport);//Adds in routing file for routing users that have been authenticated
    app.use("/", express.static('client'))

    app.use("/", (req, res) => {
        res.redirect('/');
    });
    return app;
};



