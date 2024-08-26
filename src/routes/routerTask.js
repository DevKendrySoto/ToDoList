const express = require('express');
const router = express.Router();
const tasksService = require('../services/serviceTask');

router.get('/', (req, res) => {
  const tasks = tasksService.getAllTasks();
  res.json(tasks);
});

router.post('/', (req, res) => {
  const task = req.body;
  tasksService.addTask(task);
  res.status(201).json(task);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  tasksService.toggleTaskDone(id);
  res.status(200).json({ message: 'Task updated' });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  tasksService.removeTask(id);
  res.status(200).json({ message: 'Task deleted' });
});

module.exports = router;
