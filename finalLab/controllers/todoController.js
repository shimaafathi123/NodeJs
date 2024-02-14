// todoController.js

const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, tags } = req.body;
        const todo = new Todo({ userId, title, tags });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTodos = async (req, res) => {
    try {
        const { userId } = req.user;
        const todos = await Todo.find({ userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const todo = await Todo.findById(id);
        if (!todo || todo.userId.toString() !== userId.toString()) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Check if the status is valid
        const { status } = req.body;
        if (status && !['new', 'in-progress', 'done'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Update the todo
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const todo = await Todo.findById(id);
        if (!todo || todo.userId.toString() !== userId.toString()) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
