import React, { useContext } from 'react'

import Header from './Components/Header'

import TaskCard from './Components/TaskCard'

import AddBtn from "./Components/AddBtn"

import { LuPlus } from "react-icons/lu";

import { TaskContext } from './Context/TaskContext';

import { ToastContainer } from 'react-toastify';

import "./App.css"

const App = () => {

  const { AddTaskBtn, setAddTaskBtn } = useContext(TaskContext);

  return (
    <div className='App_Main_container'>
      <ToastContainer />
      <Header />
      <div className='App_Main_card_container'>
        {AddTaskBtn && <AddBtn />}
        <TaskCard />
      </div>
      <div onClick={() => setAddTaskBtn(true)} className='Add_btn'><LuPlus /></div>
    </div>
  )
}

export default App
