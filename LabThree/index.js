const express = require('express');
const path = require('path'); 
const todosController = require('./controller/todosController');
const errorHandler = require('./controller/errorHandler');
const renderController = require('./controller/renderController');
const app = express();

app.use(express.json());
app.use('/', todosController);
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'pug'); 
app.use('/', renderController);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
