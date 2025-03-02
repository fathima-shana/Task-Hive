import React, { useState } from 'react'
import '../assests/styles/Home.css'

export default function Home() {

  const [task, setTask] = useState(''); // Input field value
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] }); // Task categories

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask(''); // Clear input
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      // Remove task from current category
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      );
      // Add task to target category
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  // Delete task from a specific category
  const deleteTask = (category, taskToDelete) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].filter((t) => t !== taskToDelete), // Remove task from the category
    }));
  };

  // Clear tasks in a specific category
  const clearTasks = (category) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [],
    }));
  };

  return (
    <div className='main'>
      <div className='form_container'>
        <form onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}>
          <table>
            <tr>
              <input 
                type="text" 
                className='text_field' 
                name='text_field' 
                placeholder='Add Tasks to do' 
                value={task} 
                onChange={handleInputChange} 
              />
              <button 
                name='add_btn' 
                className='add_btn' 
                onClick={addTask}
              >
                ADD TASK
              </button>
            </tr>
          </table>
        </form>
      </div>
      <div className='main_container'>
        {/* To-Do Section */}
        <div className='menu_bar'>
          <h3>To-Do Tasks</h3>
          <div className='task_container'>
            <ul>
              {tasks.todo.map((t, index) => (
                <li key={index} className='task-box'>
                  <div className='task-box-content'>
                    {t}
                    <button onClick={() => moveTask('todo', 'ongoing', t)}>Ongoing</button>
                    <button onClick={() => moveTask('todo', 'completed', t)}>Completed</button>
                    <button onClick={() => deleteTask('todo', t)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className='clear_btn' onClick={() => clearTasks('todo')}>Clear All</button>
          </div>
        </div>

        {/* Ongoing Section */}
        <div className='menu_bar'>
          <h3>Ongoing Tasks</h3>
          <div className='task_container'>
            <ul>
              {tasks.ongoing.map((t, index) => (
                <li key={index} className='task-box'>
                  <div className='task-box-content'>
                    {t}
                    <button onClick={() => moveTask('ongoing', 'todo', t)}>To-Do</button>
                    <button onClick={() => moveTask('ongoing', 'completed', t)}>Completed</button>
                    <button onClick={() => deleteTask('ongoing', t)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className='clear_btn' onClick={() => clearTasks('ongoing')}>Clear All</button>
          </div>
        </div>

        {/* Completed Section */}
        <div className='menu_bar'>
          <h3>Completed Tasks</h3>
          <div className='task_container'>
            <ul>
              {tasks.completed.map((t, index) => (
                <li key={index} className='task-box'>
                  <div className='task-box-content'>
                    {t}
                    <button onClick={() => moveTask('completed', 'todo', t)}>To-Do</button>
                    <button onClick={() => moveTask('completed', 'ongoing', t)}>Ongoing</button>
                    <button onClick={() => deleteTask('completed', t)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className='clear_btn' onClick={() => clearTasks('completed')}>Clear All</button>
          </div>
        </div>
      </div>
    </div>
  );
}
