import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, users, onDelete, onEdit, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (tasks.length === 0) {
    return <div>No tasks found.</div>;
  }

  const getUserById = (id) => {
    const user = users.find(user => user.id === id);
    return user ? user.name : 'Unknown';
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Assigned To: {getUserById(task.employeeId)}</p>
            <p>Status: {task.taskStatus}</p>
            <div className="taskList-search">
              <button className="edit-button" onClick={() => onEdit(task)}>Edit</button>
              <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
