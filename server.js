var http = require('http');
var url = require('url');
var formidable = require('formidable');
var qrcode = require('qrcode');
var config = require('./config.json');
var API = require('./api');
var imgur = new API.Imgur(config);

http.createServer(function(req, res) {
    var query = url.parse(req.url, true).query;
    if (req.url.match(/^\/qr\b/g) && req.method == 'GET') {
        var form = new formidable.IncomingForm();
        qrcode.toDataURL(query.url, function (err, url) {
            res.write('<html><body><img src="' + url);
            res.end('"></body></html>');
        });
    } else if (req.url.match(/^\/upload\b/g) && req.method == 'POST') {
        console.log('upload')
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            imgur.upload(files.image.path, function(err, body) {
                qrcode.toDataURL(body.data.link, function (err, url) {
                    res.write(JSON.stringify({
                        link: body.data.link,
                        qr: url
                    }));
                    res.end();
                });
            });
        });
    }
}).listen(config.port);
console.log('Listening ' + config.port + ' port')