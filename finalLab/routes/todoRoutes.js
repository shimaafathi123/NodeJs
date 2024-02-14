const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/', authenticateToken, todoController.createTodo);
router.get('/', authenticateToken, todoController.getTodos);
router.patch('/:id', authenticateToken, todoController.updateTodo);
router.delete('/:id', authenticateToken, todoController.deleteTodo);

module.exports = router;
