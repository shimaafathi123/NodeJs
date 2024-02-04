const fs = require('fs');

function handleDone(arg, todosData) {
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

module.exports = handleDone;
