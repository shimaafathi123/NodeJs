// imageHandler.js
const fs = require('fs');

function serveImage(req, res) {
    fs.readFile('./img.jpg', (err, imgContent) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(imgContent);
        }
    });
}

module.exports = serveImage;
