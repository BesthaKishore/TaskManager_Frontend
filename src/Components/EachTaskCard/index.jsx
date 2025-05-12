import React, { useContext } from 'react';

import { MdEdit, MdOutlineDelete } from "react-icons/md";

import { TaskContext } from '../../Context/TaskContext';

import { toast } from 'react-toastify';

import axios from 'axios';

import "./index.css"

const EachTaskCard = ({ eachItems }) => {

  const { title, description, date, status, remarks } = eachItems || {};

  const { setEditTask, setAddTaskBtn, backendUrl, GetAllLIST, TaskItems } = useContext(TaskContext);


  const upDateTaskList = (task) => {
    setEditTask(task);
    setAddTaskBtn(true);
  }

  const onClickDeleteList = async (eachItems) => {

    try {
      const response = await axios.delete(`${backendUrl}/api/task/delete/${eachItems._id}`);
      if (response.data.success) {
        await GetAllLIST();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message);
    }

  }

  return (
    <div className="task-card">
      <h3 className="task-title">{title}</h3>
      <p className="task-description">{description}</p>

      <div className="task-meta">
        <p className="task-date">{new Date(date).toDateString()}</p>
        <p className="task-status">Status: {status}</p>
      </div>

      <p className="task-remarks">{remarks}</p>
      <div className='Edit_delete_container'>
        <button onClick={() => upDateTaskList(eachItems)} type='button' className='delte_btn'>
          <MdEdit className='Delete_icon' color="rgb(150, 147, 147)" />
        </button>
        <button onClick={() => onClickDeleteList(eachItems)} type='button' className='delte_btn'>
          <MdOutlineDelete className='Delete_icon' color="rgb(150, 147, 147)" />
        </button>
      </div>
    </div>
  );
};

export default EachTaskCard;
