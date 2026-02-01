const Task = require("../models/taskModel");

const create = async (req,res) =>  {
    try{
        const newTask = new Task(req.body);
        const {title} = newTask;

        const taskExist = await Task.findOne({title});
        if (taskExist) {
            return res.status(400).json({message: "Task already exist! Please add new task with another name."});
        }
        const savedData = await newTask.save();
        res.status(200).json(savedData);
        // res.status(200).json({message: "Task added successfully."});
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}

const getAllTasks = async (req,res) => {
    try {
        const taskData = await Task.find();
        if (!taskData || taskData === 0) {
            return res.status(404).json({message: "Task data not found"});
        }
        console.log(taskData);
        res.status(200).json(taskData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

const getTaskById = async (req,res) => {
    try {
        const id = req.params.id;
        const taskExist = await Task.findById(id);
        if(!taskExist) {
            return res.status(404).json({message:'Task not found.'});
        }
        res.status(200).json(taskExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

const update = async (req,res) => {
    try {
        const id = req.params.id;
        const taskExist = await Task.findById(id);
        if (!taskExist) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        const updatedata = await Task.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json(updatedata);
        // res.status(200).json({message: "Task updated successfully."})
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

const deleteTask = async (req,res) => {
    try {
        const id = req.params.id;
        const taskExist = await Task.findById(id);
        if (!taskExist) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        await Task.findByIdAndDelete(id);
        res.status(200).json({message: "Task deleted successfully."})

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}


module.exports = {create, getAllTasks, getTaskById, update, deleteTask};