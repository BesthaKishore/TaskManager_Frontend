import React, { createContext, useState, useEffect } from 'react'

export const TaskContext = createContext();

import axios from "axios";

import { toast } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const TaskContextProvider = (props) => {

    const [TaskItems, setTaskItems] = useState([]);

    const [AddTaskBtn, setAddTaskBtn] = useState(false);

    const [editTask, setEditTask] = useState(null);

    const [SearchInput, setSearchInput] = useState('')

     const GetAllLIST = async () => {
        try {
          const response = await axios.get(backendUrl + '/api/task/list');
    
          if (response.data.success) {
            setTaskItems(response.data.task)
          } else {
            toast.error(response.data.message);
          }
    
        } catch (error) {
          console.log(error)
          toast.error(error.message);
        }
    
      }
    
      useEffect(() => {
        GetAllLIST();
      }, [])
    
    const value = {
        TaskItems, setTaskItems, AddTaskBtn, setAddTaskBtn, backendUrl, GetAllLIST, editTask, setEditTask, SearchInput, setSearchInput
    }

    return(
        <TaskContext.Provider value={value}>
            {props.children}
        </TaskContext.Provider>
    )

}

export default TaskContextProvider