var sqlite3 = require('sqlite3').verbose();

exports.list = function(req, res) {
    var getAllSQL = `
    SELECT *
    FROM SIGHTINGS;
    `;

    var db = new sqlite3.Database(__dirname + '/../../database/flowers.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.log(err);
        }
        else{
            console.log('Connected to flowers database')
        }
      });
    db.all(getAllSQL, [], (err, rows) => {
        if(err){
            throw(err);
        }
        rows.forEach((row) =>{
            console.log(row);
        })
        res.json(rows);
    })
    db.close();
};

exports.read = function(req, res) {
    res.json(req.sightings);
}

exports.sightingByFlowerName = function(req,res,next,flowerName){
    var getSightingByNameSQL = `
        SELECT * 
        FROM SIGHTINGS 
        WHERE NAME = ?
        LIMIT 10
        ;    
    `;
    var db = new sqlite3.Database(__dirname + '/../../database/flowers.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.log(err);
        }
        else{
            console.log('Connected to flowers database')
        }
      });
    db.all(getSightingByNameSQL, [flowerName], (err,rows) => {
        if(err){
            console.log(err);
        }
        req.sightings = rows;
        next();
    })
    db.close;
}

//http://localhost:8080/api/sightings/California%20flannelbush