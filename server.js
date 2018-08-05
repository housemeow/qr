var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var request = require('request');
var qrcode = require('qrcode');
var config = require('./config.json');

http.createServer(function(req, res) {
    if (req.url == '/upload' && req.method == 'POST') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            console.log(files);
            var qr = false;
            if ('qr' in fields) {
                qr = JSON.parse(fields.qr);
            }

            request.post({
                url: 'https://api.imgur.com/3/image',
                formData: {
                    image: fs.createReadStream(files.image.path)
                },
                headers: {
                    'Authorization': 'Client-ID ' + config.clientId
                }
            }, function(err, httpResponse, body) {
                body = JSON.parse(body);
                console.log(body.data.link);
                
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
}).listen(8083);
