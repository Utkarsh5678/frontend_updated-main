// src/UserTasks.js
import React, { useState, useEffect } from 'react';
import AdminService from './AdminService';
import TaskList from './TaskList';

const UserTasks = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserTasks();
  }, [userId]);

  const fetchUserTasks = async () => {
    const adminService = new AdminService();
    try {
      const response = await adminService.getUserTasks(userId);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Tasks Assigned to User</h2>
      <TaskList tasks={tasks} loading={loading} onDelete={() => {}} onEdit={() => {}} />
    </div>
  );
};

export default UserTasks;
