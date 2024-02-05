const fs = require('fs');

function serveCSS(req, res) {
    fs.readFile('./styles.css', 'utf-8', (err, cssContent) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(cssContent);
        }
    });
}

module.exports = serveCSS;
