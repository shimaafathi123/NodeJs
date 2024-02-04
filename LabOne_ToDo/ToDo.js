const fs = require('fs');
const [,,cmd,arg] = process.argv;
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

if (cmd === 'add') {
    if (arg) {
        let id;
        if (todosData.length > 0) {
            id = todosData[todosData.length - 1].id + 1;
        } else {
            id = 1;
        }
        const newEntry = { id: id, todo: arg };

        todosData.push(newEntry);

        fs.writeFileSync('./todos.json', JSON.stringify(todosData), 'utf8');
        console.log(`Added new todo: "${arg}" with id ${id}`);
    } else {
        console.log('Please provide a todo to add.');
    }
}
if (cmd === 'list') {
    if (todosData.length > 0) {
        console.log('All entries:');
        for (let i = 0; i < todosData.length; i++) {
            const status = todosData[i].done ? 'Done' : 'Todo';
            console.log(`Title: ${todosData[i].todo} Status: ${status}`);
        }
    } else {
        console.log('No entries found.');
    }
}
if (cmd === 'done') {
    if (arg) {
        const entryId = parseInt(arg);
        const todoIndex = todosData.findIndex(entry => entry.id === entryId);

        if (todoIndex !== -1) {
            if (!todosData[todoIndex].done) {
                todosData[todoIndex].done = true;

                fs.writeFileSync('./todos.json', JSON.stringify(todosData), 'utf8');
                console.log(`Marked todo with id ${entryId} as done.`);
            } else {
                console.log(`Todo with id ${entryId} is already marked as done.`);
            }
        } else {
            console.log(`Todo with id ${entryId} not found.`);
        }
    } else {
        console.log('Please provide the id of the todo to mark as done.');
    }
}

if (cmd === 'edit') {
    if (arg) {
        const entryId = parseInt(arg);
        const todoIndex = todosData.findIndex(entry => entry.id === entryId);

        if (todoIndex !== -1) {
            const newTitle = process.argv[4];

            if (newTitle) {
                todosData[todoIndex].todo = newTitle;

                fs.writeFileSync('./todos.json', JSON.stringify(todosData), 'utf8');
                console.log(`Edited todo with id ${entryId} to: "${newTitle}"`);
            } else {
                console.log('Please provide the new title to edit the todo.');
            }
        } else {
            console.log(`Todo with id ${entryId} not found.`);
        }
    } else {
        console.log('Please provide the id of the todo to edit.');
    }
}


if (cmd === 'delete') {
    if (arg) {
        const entryId = parseInt(arg);
        
        const todoIndex = todosData.findIndex(entry => entry.id === entryId);

        if (todoIndex !== -1) {
            const deletedTodo = todosData.splice(todoIndex, 1)[0];

            fs.writeFileSync('./todos.json', JSON.stringify(todosData), 'utf8');
            console.log(`Deleted todo with id ${entryId}: "${deletedTodo.todo}".`);
        } else {
            console.log(`Todo with id ${entryId} not found.`);
        }
    } else {
        console.log('Please provide the id of the todo to delete.');
    }
}
