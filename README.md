# Config
> Provide image upload api and qr code api.

1. Copy `config.json.sample` to `config.json`
2. Modify `clientId` as your imgur application client id.
3. Modify `port` as your server port.
4. 
```
node server.js
```

## config.json
```json
{
	"clientId": "123450987654321",
	"port": 8083
}
```

## [POST] /upload
> Upload image
```json
{
	"image": "IMAGE FILE YOU UPLOAD"
}
```

## [GET]  /qr?url=YOUR_URL
> QR Code