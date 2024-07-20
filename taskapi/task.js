const express = require('express');
const router = express.Router();

let tasks = [];
let idCounter = 1;

// Get all tasks
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

// Get a task by ID
router.get('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
});

// Create a new task
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    const newTask = { id: idCounter++, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task by ID
router.put('/:id', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks[taskIndex] = { id: parseInt(req.params.id), title, description };
    res.status(200).json(tasks[taskIndex]);
});

// Delete a task by ID
router.delete('/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).end();
});

module.exports = router;
