import React, { useEffect, useState } from 'react'
import "./Task.css"
import axios from "axios"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'


const Task = () => {
    const [task, setTask] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/tasks");
                setTask(response.data);

            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, [])

    const deleteTask = async (taskId) => {
        await axios.delete(`http://localhost:5000/api/delete/task/${taskId}`)
            .then((response) => {
                setTask((prevTask) => prevTask.filter((task) => task._id !== taskId))
                toast
                    .success(response.data.message, { position: "top-right" })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='taskTable'>
            <Link to="/add"
                type="button"
                className="btn btn-info">
                <i className="fa-solid fa-user-plus"></i>
                Add Task
            </Link>
          
            
            {task.length === 0 ? (
                <div className='noData'>
                    <h3>
                        No Data to Display.
                    </h3>
                    <p>Please add New Task.</p>
                </div>
            ) : (
                    <table className='table bg-primary border-white fw-bold text-white'>
                    {/* <thead>
                        <tr>
                            <th scope='col'>S.No.</th>
                            <th scope='col'>Title</th>
                            <th scope='col'>Status</th>
                            
                            <th scope='col'>Actions</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {task.map((task, index) => {
                            return (
                                < tr className='' >
                                    <td>{index + 1} </td>
                                    <td >{task.title} </td>
                                    <td>{task.status}</td>
                                    <td>{task.description}</td>
                                    <td>
                                       
                                        <Link to={`/update/` + task._id} type="button" className="btn btn-info">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link> &nbsp;
                                        <button onClick={() => deleteTask(task._id)} type="button" className="btn btn-danger">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                
            )}
            

        </div>
    )
}

export default Task;