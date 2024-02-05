const fs = require('fs');

function serveHomePage(req, res) {
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

module.exports = serveHomePage;
