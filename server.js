var http = require('http');
var formidable = require('formidable');
var qrcode = require('qrcode');
var config = require('./config.json');
var API = require('./api');
var imgur = new API.Imgur(config);

http.createServer(function(req, res) {
    if (req.url == '/upload' && req.method == 'POST') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var qr = false;
            if ('qr' in fields) {
                qr = JSON.parse(fields.qr);
            }

            imgur.upload(files.image.path, function(err, body) {
                if (qr) {
                    qrcode.toDataURL(body.data.link, function (err, url) {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write('<html><body><img src="' + url + '"/></body></html>');
                        res.end();
                    });
                } else {
                    res.write(body.data.link);
                    res.end();
                }
            });
        });
    }
}).listen(config.port);
console.log('Listening ' + config.port + ' port')