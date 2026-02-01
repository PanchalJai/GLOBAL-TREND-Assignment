import React, { useState } from 'react'
import './AddTask.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';

const AddTask = () => {
    const tasks = {
        title: "",
        description: "",
        status: "",
    }
    const [task, setTask] = useState(tasks);
    const nevigate = useNavigate();
    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setTask({ ...task, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/task", task)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
                nevigate("/")
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <div className='addTask'>
            <Link
                to="/"
                type="button"
                class="btn  bg-primary text-white">
                <i className="fa-solid fa-backward"></i>
                &nbsp; Back
            </Link>
            <h3 className='text-center mb-4 '>Add New Task</h3>
            <form action="" className='addTaskForm offset-2' onSubmit={submitForm}>

                <div className='inputGroup col-8 mb-3'>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id='title'
                        onChange={inputHandler}
                        name='title'
                        autoComplete='off'
                        placeholder="enter your task" />

                </div>

                <div className="mb-3 inputGroup col-8">
                    <label htmlFor="email" className="form-label">Description</label>
                    <textarea
                        type="text"
                        rows='2'
                        cols='50'
                        className="form-control"
                        id="description"
                        onChange={inputHandler}
                        name='description'
                        autoComplete='off'
                        placeholder="write a short description ..." ></textarea>
                </div>
                <div className='inputGroup col-8 mb-3'>
                    <label htmlFor="username" className="form-label">Status</label>
                    <input
                        type="text"
                        id='status'
                        onChange={inputHandler}
                        name='status'
                        className="form-control"
                        autoComplete='off'
                        placeholder="Done or not done. " />

                    
                </div>
                <div className='inputGroup offset-3'>
                    <button type="submit" className="btn btn-info">Submit</button>
                </div>


            </form>

        </div>
    )
}

export default AddTask;