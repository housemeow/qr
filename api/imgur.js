(function() {
    var request = require('request');
    var fs = require('fs');
    var config = require('../config.json');

    function Imgur(config) {
        this.upload = function(path, callback) {
            request.post({
                url: 'https://api.imgur.com/3/image',
                formData: {
                    image: fs.createReadStream(path)
                },
                headers: {
                    'Authorization': 'Client-ID ' + config.clientId
                }
            }, function(err, httpResponse, body) {
                body = JSON.parse(body);
                if (!err) {
                    console.log('Imgur: uploaded.', body.data.link);
                } else {
                    console.log('Imgur: error', err);
                }
                callback(err, body);
            });
        }
    }

    module.exports = Imgur;
})();