import React, { useContext } from 'react'

import { TaskContext } from '../../Context/TaskContext'

import EachTaskCard from "../EachTaskCard"

import "./index.css"

const TaskCard = () => {

  const { TaskItems, SearchInput, setAddTaskBtn } = useContext(TaskContext);

  const SearchResult = TaskItems.filter((items) => items.title.toLowerCase().includes(SearchInput.toLowerCase()));

  return (
    <div className='Task_card_container'>
      {SearchResult.length > 0 ? (
      <ul className='Task_Items_un_order_list'>
        {SearchResult.map((items) => (
          <EachTaskCard key={items._id} eachItems={items} />
        ))}
      </ul>
      ) : (
        <div className='Error_container'>
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" alt="no-task" className='no_task_image' />
          <p className='Error_msg'>No Task List</p>
          <button onClick={() => setAddTaskBtn(true)} type='button' className='Add_Task'>Add Task</button>
        </div>
      )}
    </div>
  )
}

export default TaskCard
