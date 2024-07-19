import React, { useEffect, useState } from 'react';
import './Employee.css';
import EmployeeService from './EmployeeService';

const EmployeePage = () => {
  const [tasks, setTasks] = useState([]);
  const [completedMessage, setCompletedMessage] = useState('');
  const employeeService = new EmployeeService();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await employeeService.getEmployeeTasksById();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await employeeService.updateTaskStatus(taskId, newStatus);
      fetchTasks();
      setCompletedMessage(`Task ${taskId} has been marked as completed.`);
      setTimeout(() => {
        setCompletedMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="employee-container">
      <h1>Employee Page</h1>
      <h2>Your Tasks</h2>
      {completedMessage && <p>{completedMessage}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleUpdateTaskStatus(task.id, 'COMPLETED')}>
              Mark as Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeePage;
