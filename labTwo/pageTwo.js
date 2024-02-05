const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/styles.css') {
        fs.readFile('./styles.css', 'utf-8', (err, cssContent) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(cssContent);
            }
        });
    } else if (req.url === '/astronomy') {
        // Serve the astronomy page
        fs.readFile('./astronomy.html', 'utf-8', (err, pageContent) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(pageContent);
            }
        });
    } else {
        // For the home page
        fs.readFile('./todos.json', 'utf-8', (err, todosData) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                const todos = JSON.parse(todosData);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>PageOne</title>
                        <link rel="stylesheet" href="/styles.css">
                    </head>
                    <body>
                        <h1>My ToDo List for Yesterday</h1>
                `);

                todos.forEach((item) => {
                    res.write(`
                        <div>
                            <input type="checkbox" id="todo-${item.todo}" name="todo-${item.todo}" value="${item.todo}">
                            <label for="todo-${item.todo}">${item.todo}</label><br>
                        </div>
                    `);
                });

                res.write(`</body></html>`);
                res.end();
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
