var GoogleImages = require('google-images'),
    config = require('./config')

searchClient = new GoogleImages(config.CSEID, config.APIKey);
module.exports.client = searchClient;