import axios from 'axios';

const BASIC_URL = 'http://localhost:8080/';

class EmployeeService {
  constructor() {
    this.api = axios.create({
      baseURL: BASIC_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  createAuthorizationHeader() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  getEmployeeTasksById() {
    const headers = this.createAuthorizationHeader();
    return this.api.get('api/employee/tasks', { headers });
  }

  updateTaskStatus(taskId, newStatus) {
    const headers = this.createAuthorizationHeader();
    return this.api.get(`api/employee/task/${taskId}/${newStatus}`, { headers });
  }

  createComment(taskId, content) {
    const headers = this.createAuthorizationHeader();
    return this.api.post(`api/employee/task/comment/${taskId}`, { content }, { headers });
  }

  getCommentsByTaskId(taskId) {
    const headers = this.createAuthorizationHeader();
    return this.api.get(`api/employee/comments/${taskId}`, { headers });
  }
}

export default EmployeeService;
