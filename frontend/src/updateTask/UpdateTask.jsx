import React, { useEffect, useState } from 'react'
import './update.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';

const UpdateTask = () => {
    const tasks = {
        title: "",
        description: "",
        status: "",
    }
    const [task, setTask] = useState(tasks);
    const nevigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/task/${id}`)
            .then((response) => {
                setTask(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id])
    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setTask({ ...task, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/update/task/${id}`, task)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
                nevigate("/")
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <div className='addTask '>
            <Link
                to="/"
                type="button"
                className="btn  bg-primary text-white">
                <i className="fa-solid fa-backward"></i>
                &nbsp; Back
            </Link>
            <h3 className='text-center mb-4 '>Update Task</h3>
            <form action="" className='addTaskForm offset-2' onSubmit={submitForm}>

                <div className='inputGroup col-8 mb-3 '>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id='title'
                        value={task.title}
                        onChange={inputHandler}
                        name='title'
                        autoComplete='off'
                        placeholder="enter your task" />

                </div>

                <div className='inputGroup col-8 mb-3'>
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        type="text"
                        rows='2'
                        cols='50'
                        id='description'
                        value={task.description}
                        onChange={inputHandler}
                        name='description'
                        className="form-control"
                        autoComplete='off'
                        placeholder="write some description ... " >

                    </textarea>
                </div>

                <div className="mb-3 inputGroup col-8">
                    <label htmlFor="status" className="form-label">Status</label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        value={task.status}
                        onChange={inputHandler}
                        name='status'
                        autoComplete='off'
                        placeholder="Done or not done" />
                </div>
               
                <div className='inputGroup offset-3'>
                    <button type="submit" className="btn btn-info">Submit</button>
                </div>


            </form>

        </div>
    )
}

export default UpdateTask;