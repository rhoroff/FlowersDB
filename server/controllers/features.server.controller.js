var sqlite3 = require('sqlite3').verbose();

var getAllSQL = `SELECT * FROM FEATURES;`;

exports.list = function(req, res) {
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