const fs = require('fs');

function handleEdit(arg, argv, todosData) {
    if (arg) {
        const entryId = parseInt(arg);
        const todoIndex = todosData.findIndex(entry => entry.id === entryId);

        if (todoIndex !== -1) {
            const newTitle = argv[4];

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

module.exports = handleEdit;
