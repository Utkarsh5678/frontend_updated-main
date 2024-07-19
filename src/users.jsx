// Admin.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError(new Error('No auth token found'));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchTasks = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError(new Error('No auth token found'));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/admin/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchUsers();
    fetchTasks();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>

      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title} - {task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
