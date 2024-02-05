const fs = require('fs');

function handleDownload(req, res) {
    fs.readFile('./img.jpg', (err, imgContent) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.setHeader('Content-disposition', 'attachment; filename=img.jpg');
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(imgContent);
        }
    });
}

module.exports = handleDownload;
