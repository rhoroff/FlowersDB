var sqlite3 = require('sqlite3').verbose();

exports.getCurrentUser = function(req,res){
    var getCurrentUserNameSQL = `
    SELECT first_name, last_name 
    FROM users
    WHERE username = ?
    `;
    var db = new sqlite3.Database(__dirname + '/../../database/flowers.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.log(err);
        }
        else{
            console.log('Connected to flowers database')
        }
      });
    db.get(getCurrentUserNameSQL, [req.user.username], (err, row) => {
        if(err){
            throw(err);
        }

        res.json(row);
    })
    db.close();
}