const express = require('express');

const {create, getAllTasks, getTaskById, update, deleteTask  } = require('../controllars/taskControllar');


const route = express.Router();

route.post('/task', create);
route.get('/tasks', getAllTasks);
route.get('/task/:id', getTaskById);
route.put('/update/task/:id', update);
route.delete('/delete/task/:id', deleteTask);

module.exports = route; 