const fs = require('fs');
const addHandler = require('./addHandler');
const listHandler = require('./listHandler');
const doneHandler = require('./doneHandler');
const editHandler = require('./editHandler');
const deleteHandler = require('./deleteHandler');

const [,, cmd, arg] = process.argv;

let todosData;

if (fs.existsSync('./todos.json')) {
    todosData = JSON.parse(fs.readFileSync('./todos.json', 'utf8'));
    console.log('Contents of todos.json:', todosData);
} else {
    console.log('todos.json does not exist.');
    fs.writeFileSync('./todos.json', '[]', 'utf8');
    console.log('todos.json created.');
    todosData = [];
}

switch (cmd) {
    case 'add':
        addHandler(arg, todosData);
        break;
    case 'list':
        listHandler(todosData);
        break;
    case 'done':
        doneHandler(arg, todosData);
        break;
    case 'edit':
        editHandler(arg, process.argv, todosData);
        break;
    case 'delete':
        deleteHandler(arg, todosData);
        break;
    default:
        console.log('Invalid command.');
}
