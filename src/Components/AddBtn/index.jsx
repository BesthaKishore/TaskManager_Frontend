import React, { useContext, useEffect, useState } from 'react'

import { TaskContext } from '../../Context/TaskContext';

import { toast } from 'react-toastify';

import axios from "axios";

import "./index.css"

const AddBtn = () => {

  const { backendUrl, setAddTaskBtn, GetAllLIST, editTask, setEditTask } = useContext(TaskContext);

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [date, setDate] = useState('');

  const [status, setStatus] = useState('Pending');

  const [remarks, setRemarks] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        const response = await axios.put(`${backendUrl}/api/task/update/${editTask._id}`, {
          title, description, date, status, remarks
        });
        if (response.data.success) {
          toast.success(response.data.message);
          await GetAllLIST();
          setTitle('');
          setDescription('');
          setDate('');
          setStatus('Pending');
          setRemarks('');
          setAddTaskBtn(false);
          setEditTask(null);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/task/add`, {
          title, description, date, status, remarks
        });
        if (response.data.success) {
          toast.success(response.data.message);
          await GetAllLIST();
          setTitle('');
          setDescription('');
          setDate('');
          setStatus('Pending');
          setRemarks('');
          setAddTaskBtn(false);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const onChangeInputHandler = (e, filed) => {
    filed(e.target.value);
  }

  useEffect(() => {

    if (editTask) {
      setTitle(editTask.title)
      setDescription(editTask.description)
      setDate(editTask.date.slice(0, 10))
      setStatus(editTask.status)
      setRemarks(editTask.remarks);
    }

  }, [editTask])

  return (
    <form className='Add_Btn_Form_container' onSubmit={onSubmitHandler}>
      <p className='Add_btn_heading'>New Task</p>

      <div className='input_filed_Section'>
        <label className='Input_label'>Title</label>
        <input onChange={(e) => onChangeInputHandler(e, setTitle)} value={title} type='text' className='input_filed' required placeholder='Title' />
      </div>

      <div className='input_filed_Section'>
        <label className='Input_label'>Description</label>
        <input onChange={(e) => onChangeInputHandler(e, setDescription)} value={description} type='text' className='input_filed' required placeholder='Description' />
      </div>

      <div className='input_filed_Section'>
        <label className='Input_label'>Date</label>
        <input onChange={(e) => onChangeInputHandler(e, setDate)} value={date} type='date' className='input_filed' required placeholder='Date' />
      </div>

      <div className='input_filed_Section'>
        <label className='Input_label'>Title</label>
        <select className='input_filed' onChange={(e) => onChangeInputHandler(e, setStatus)}>
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className='input_filed_Section'>
        <label className='Input_label'>Remarks</label>
        <input onChange={(e) => onChangeInputHandler(e, setRemarks)} value={remarks} type='text' className='input_filed' required placeholder='Remarks' />
      </div>

      <button className='submit_btn' type='submit'>ADD Task</button>

    </form>
  )
}

export default AddBtn
