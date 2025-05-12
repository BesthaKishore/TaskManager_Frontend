import React, { useContext } from 'react'

import { RiSearchLine } from "react-icons/ri";

import { MdClear } from "react-icons/md";

import { TaskContext } from '../../Context/TaskContext';

import { toast } from 'react-toastify';

import axios from 'axios';

import "./index.css"

const Header = () => {

  const { SearchInput, setSearchInput, backendUrl, GetAllLIST, TaskItems } = useContext(TaskContext);

  const ClaerAllTaskHandler = async () => {
    try {

      if (TaskItems.length > 0) {

        const ClearResponse = await axios.delete(backendUrl + '/api/task/deleteAll');

        if (ClearResponse.data.success) {
          await GetAllLIST();
          toast.success(ClearResponse.data.message);
        } else {
          toast.error(ClearResponse.data.message);
        }
      }else{
        toast.error("Task Card Empty!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <header className='Header_main_container'>
      <h1 className='Header_heading'>TASK</h1>
      <div className='Header_input_contianer'>
        <input onChange={(e) => setSearchInput(e.target.value)} value={SearchInput} type='text' placeholder='Search' className='Header_input' />
        <RiSearchLine className='icon' />
      </div>
      <button onClick={ClaerAllTaskHandler} type='button' className='Header_btn'>Clear <MdClear className='icon' /></button>
    </header>
  )
}

export default Header
