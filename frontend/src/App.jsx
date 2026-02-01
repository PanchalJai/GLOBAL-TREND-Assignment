
import './App.css';
import Task from './getTask/Task.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddTask from './addTask/AddTask.jsx';

import UpdateTask from './updateTask/UpdateTask.jsx';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Task />
    },
    {
      path: "/add",
      element: <AddTask />,
    },
    {
      path: "/update/:id",
      element: <UpdateTask />
    }


  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
