var config = require('./config'),
    express = require('./express');
    
module.exports.start = function() {
    var app = express.init();
    app.listen(config.port, function() {
        console.log('Esketit on port', config.port);
    });
    
}