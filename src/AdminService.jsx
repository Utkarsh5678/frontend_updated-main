// src/AdminService.js
import axios from 'axios';

const BASIC_URL = 'http://localhost:8080/';

class AdminService {
  // User-related methods
  getUsers() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(`${BASIC_URL}api/admin/users`, { headers });
  }

  // Task-related methods
  createTask(task) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.post(`${BASIC_URL}api/admin/task`, task, { headers });
  }

  getTasks() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(`${BASIC_URL}api/admin/tasks`, { headers });
  }

  deleteTask(taskId) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.delete(`${BASIC_URL}api/admin/task/${taskId}`, { headers });
  }

  updateTask(taskId, task) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.put(`${BASIC_URL}api/admin/task/${taskId}`, task, { headers });
  }

  searchTasks(title) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(`${BASIC_URL}api/admin/tasks/search/${title}`, { headers });
  }

  // Project-related methods
  createProject(project) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.post(`${BASIC_URL}api/admin/project`, project, { headers });
  }

  getProjects() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(`${BASIC_URL}api/admin/projects`, { headers });
  }

  deleteProject(projectId) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.delete(`${BASIC_URL}api/admin/project/${projectId}`, { headers });
  }

  updateProject(projectId, project) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.put(`${BASIC_URL}api/admin/project/${projectId}`, project, { headers });
  }
}

export default AdminService;
