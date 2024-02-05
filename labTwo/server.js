const http = require('http');
const serveCSS = require('./cssHandler');
const serveImage = require('./imageHandler');
const serveHomePage = require('./homeHandler');
const handleDownload = require('./downloadHandler');

const server = http.createServer((req, res) => {
    if (req.url === '/styles.css') {
        serveCSS(req, res);
    } else if (req.url === '/astronomy') {
        serveImage(req, res);
    } else if (req.url === '/astronomy/download') {
        handleDownload(req, res); // Use the new module for download
    } else if (req.url === '/') {
        serveHomePage(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
