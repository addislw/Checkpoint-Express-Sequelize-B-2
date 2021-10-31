const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
const { list, listPeople, add, reset, complete, remove } = require('../models/express-models/todos');
module.exports = router;

router.get('/users', (req, res, next) => {
  const people = listPeople();
  res.json(people);
});

router.get('/users/:name/tasks', (req, res, next) => {
  const name = req.params.name;
  let tasks = list(name);

  if (tasks === undefined) {
    res.status(404).send('invalid user');
  }
  let query = req.query;
  console.log(query);

  if (Object.keys(query).length) {
    query = query['status'] === 'active' ? false : true;
    tasks = tasks.filter(task => task.complete === query);
  }

  res.json(tasks);
});

router.post('/users/:name/tasks', (req, res, next) => {
  let name = req.params.name;
  const task = req.body;

  if (!task.content) {
    res.status(400).send('no content');
    return;
  }

  tasksObj = add(name, task);
  const tasks = list(name);
  res.status(201).send(tasks[tasks.length - 1]);
});

router.put('/users/:name/tasks/:index', function (req, res) {
  let name = req.params.name;
  let index = req.params.index;
  res.send(complete(name, index));
});

router.delete('/users/:name/tasks/:index', function (req, res) {
  let name = req.params.name;
  let index = req.params.index;
  res.status(204).send(remove(name, index));
});
