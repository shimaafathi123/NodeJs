const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const file = 'todos.json';

router.get('/', (req, res, next) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    const todos = JSON.parse(data);
    res.render('index', { todos });
  });
});

router.get('/todos', (req, res, next) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    res.json(JSON.parse(data));
  });
});

router.get('/todos/:id', (req, res, next) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    const todos = JSON.parse(data);
    const task = todos.find(task => task.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  });
});

router.post('/todos', (req, res, next) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    const todos = JSON.parse(data);
    const newTask = req.body;
    todos.push(newTask);
    fs.writeFile(file, JSON.stringify(todos, null, 2), err => {
      if (err) {
        return next(err);
      }
      res.status(201).json(newTask);
    });
  });
});

router.put('/todos/:id', (req, res, next) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    let todos = JSON.parse(data);
    const updatedItem = req.body;
    const index = todos.findIndex(task => task.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    todos[index] = { ...todos[index], ...updatedItem };
    fs.writeFile(file, JSON.stringify(todos, null, 2), err => {
      if (err) {
        return next(err);
      }
      res.json(todos[index]);
    });
  });
});

router.delete('/todos/:id', (req, res, next) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    let todos = JSON.parse(data);
    const taskToDelete = todos.find(task => task.id === parseInt(req.params.id));
    if (!taskToDelete) {
      return res.status(404).json({ error: 'Task not found' });
    }
    todos = todos.filter(task => task !== taskToDelete);
    fs.writeFile(file, JSON.stringify(todos, null, 2), err => {
      if (err) {
        return next(err);
      }
      res.json(taskToDelete);
    });
  });
});

module.exports = router;
