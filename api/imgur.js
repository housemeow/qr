(function() {
    var request = require('request');
    var fs = require('fs');

    function Imgur(config) {
        this.upload = function(path, callback) {
            request.post({
                url: 'https://api.imgur.com/3/image',
                formData: {
                    image: fs.createReadStream(path)
                },
                headers: {
                    'Authorization': 'Client-ID fc8412894d22aa7'
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