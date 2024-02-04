const fs = require('fs');

function handleDelete(arg, todosData) {
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

module.exports = handleDelete;
