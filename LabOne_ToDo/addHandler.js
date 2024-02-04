const fs = require('fs');

function handleAdd(arg, todosData) {
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

module.exports = handleAdd;
