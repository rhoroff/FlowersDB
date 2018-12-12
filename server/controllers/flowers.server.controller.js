var sqlite3 = require('sqlite3').verbose(),
    search = require('./../config/search'),
    GoogleImages = require('google-images'),
    flowerURLS = require('../config/flowerUrls')



var getAllSQL = `SELECT * FROM FLOWERS;`;

exports.list = function(req, res) {
    var db = new sqlite3.Database(__dirname + '/../../database/flowers.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.log(err);
        }
        else{
            console.log('Connected to flowers database')
        }
      });
    var getAllSQL = `SELECT * FROM FLOWERS;`;
    db.all(getAllSQL, [], (err, rows) => {
        if(err){
            throw(err);
        }
        res.json(rows);
    })
    db.close();
}

exports.read = function(req, res) {
    res.json(req.results);
    console.log('Is this the error?');
}
exports.getFlowerImage = function(req, res, next, flowerName) {
    // console.log('The google search is failing');
    // search.client.search(flowerName, {safe :'high'}).then(images => {
    //     req.results=images;
    //     next();
    // }, function(error) {
    //     console.error(error.error);
    // });
    req.results = flowerURLS;
    next();
}
