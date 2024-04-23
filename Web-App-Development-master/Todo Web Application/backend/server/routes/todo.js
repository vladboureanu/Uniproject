const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all TODO items
router.get('/todos', todoController.getAll);
// Add a new TODO item
router.post('/todos', todoController.addTodo);
// Update a TODO task item
router.put('/todos/:id', todoController.updateTask);
// Set a TODO item as complete
router.put('/todos/:id/complete', todoController.setComplete);
// DELETE a TODO item
router.delete('/todos/:id', todoController.deleteTask);
// Search tasks by keyword
router.get('/todos/search/:keyword',todoController.search);
// Upload file(s) for a task
router.post('/todos/:id/files', todoController.uploadFiles);
// Set priority to a task
router.post('/todos/:id/priority', todoController.setPriority);
// Set labels for a task
router.post('/todos/:id/labels', todoController.setLabels);
// Set Due Date for a task
router.post('/todos/:id/due_date', todoController.setDueDate);

module.exports = router;