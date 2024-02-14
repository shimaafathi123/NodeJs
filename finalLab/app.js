const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/todoApp', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/todos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'todos.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
