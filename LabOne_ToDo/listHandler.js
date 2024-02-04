function handleList(todosData) {
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

module.exports = handleList;
