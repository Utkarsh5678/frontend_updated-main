import React, { useEffect, useState } from 'react';
import './Admin.css';
import AdminService from './AdminService';
import ProjectList from './ProjectList';

const Admin = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    owner: ''
  });

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'LOW',
    employeeId: '',
    taskStatus: 'PENDING',
    projectId: ''
  });

  const [projects, setProjects] = useState([]);
  const [tasksList, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    const adminService = new AdminService();
    try {
      const response = await adminService.getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTasks = async () => {
    const adminService = new AdminService();
    try {
      const response = await adminService.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const adminService = new AdminService();
    try {
      const response = await adminService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value
    }));
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const adminService = new AdminService();
    try {
      const projectData = {
        ...project,
        ownerId: parseInt(project.owner, 10)
      };

      if (isEditingProject) {
        await adminService.updateProject(editProjectId, projectData);
        alert('Project updated successfully');
        setIsEditingProject(false);
        setEditProjectId(null);
      } else {
        await adminService.createProject(projectData);
        alert('Project created successfully');
      }

      setProject({ title: '', description: '', startDate: '', endDate: '', owner: '' });
      fetchProjects();
    } catch (error) {
      console.error('Error creating/updating project:', error);
      alert('Failed to create/update project');
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const adminService = new AdminService();
    try {
      if (isEditingTask) {
        await adminService.updateTask(editTaskId, task);
        alert('Task updated successfully');
        setIsEditingTask(false);
        setEditTaskId(null);
      } else {
        await adminService.createTask(task);
        alert('Task created successfully');
      }

      setTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'LOW',
        employeeId: '',
        taskStatus: 'PENDING',
        projectId: ''
      });
      fetchTasks();
    } catch (error) {
      console.error('Error creating/updating task:', error);
      alert('Failed to create/update task');
    }
  };

  const handleDeleteProject = async (projectId) => {
    const adminService = new AdminService();
    try {
      await adminService.deleteProject(projectId);
      alert('Project deleted successfully');
      fetchProjects();
      fetchTasks();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const handleDeleteTask = async (taskId) => {
    const adminService = new AdminService();
    try {
      await adminService.deleteTask(taskId);
      alert('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    const formattedDueDate = task.dueDate.split('T')[0];
    setTask({
      title: task.title,
      description: task.description,
      dueDate: formattedDueDate,
      priority: task.priority,
      employeeId: task.employeeId,
      taskStatus: task.taskStatus,
      projectId: task.projectId
    });
    setIsEditingTask(true);
    setEditTaskId(task.id);
  };

  const handleEditProject = (project) => {
    const formattedStartDate = project.startDate.split('T')[0];
    const formattedEndDate = project.endDate.split('T')[0];
    setProject({
      title: project.title,
      description: project.description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      owner: project.ownerId
    });
    setIsEditingProject(true);
    setEditProjectId(project.id);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const adminService = new AdminService();
    try {
      const response = await adminService.searchTasks(searchTerm);
      setTasks(response.data);
      setIsSearching(true);
    } catch (error) {
      console.error('Error searching tasks:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowAllTasks = () => {
    setSearchTerm('');
    fetchTasks();
    setIsSearching(false);
  };

  return (
    <div className="admin-container">
      <h2>{isEditingProject ? 'Edit Project' : 'Create a New Project'}</h2>
      <form className="admin-form" onSubmit={handleProjectSubmit}>
        {/* Project form fields */}
        <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={handleProjectChange} required />
        <textarea name="description" placeholder="Project Description" value={project.description} onChange={handleProjectChange} required />
        <input type="date" name="startDate" placeholder="Start Date" value={project.startDate} onChange={handleProjectChange} required />
        <input type="date" name="endDate" placeholder="End Date" value={project.endDate} onChange={handleProjectChange} required />
        <select name="owner" value={project.owner} onChange={handleProjectChange} required>
          <option value="">Select Owner</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button type="submit">{isEditingProject ? 'Update Project' : 'Create Project'}</button>
      </form>

      <h2>{isEditingTask ? 'Edit Task' : 'Create a New Task'}</h2>
      <form className="admin-form" onSubmit={handleTaskSubmit}>
        {/* Task form fields */}
        <input type="text" name="title" placeholder="Task Title" value={task.title} onChange={handleTaskChange} required />
        <textarea name="description" placeholder="Task Description" value={task.description} onChange={handleTaskChange} required />
        <input type="date" name="dueDate" placeholder="Due Date" value={task.dueDate} onChange={handleTaskChange} required />
        <select name="priority" value={task.priority} onChange={handleTaskChange} required>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <select name="employeeId" value={task.employeeId} onChange={handleTaskChange} required>
          <option value="">Assign to Employee</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <select name="taskStatus" value={task.taskStatus} onChange={handleTaskChange} required>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select name="projectId" value={task.projectId} onChange={handleTaskChange} required>
          <option value="">Select Project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.title}</option>
          ))}
        </select>
        <button type="submit">{isEditingTask ? 'Update Task' : 'Create Task'}</button>
      </form>

      <div className="task-list-container">
        <h2>Task List</h2>
        <form onSubmit={handleSearch}>
          <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search tasks..." />
          <button type="submit">Search</button>
          {isSearching && <button type="button" onClick={handleShowAllTasks}>Show All Tasks</button>}
        </form>
      </div>

      <ProjectList
        projects={projects}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
        tasks={tasksList}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        users={users}
        loading={loading}
      />
    </div>
  );
};

export default Admin;
import React, { useEffect, useState } from 'react';
import './Admin.css';
import AdminService from './AdminService';
import ProjectList from './ProjectList';

const Admin = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    owner: ''
  });

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'LOW',
    employeeId: '',
    taskStatus: 'PENDING',
    projectId: ''
  });

  const [projects, setProjects] = useState([]);
  const [tasksList, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    const adminService = new AdminService();
    try {
      const response = await adminService.getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTasks = async () => {
    const adminService = new AdminService();
    try {
      const response = await adminService.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const adminService = new AdminService();
    try {
      const response = await adminService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value
    }));
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const adminService = new AdminService();
    try {
      const projectData = {
        ...project,
        ownerId: parseInt(project.owner, 10)
      };

      if (isEditingProject) {
        await adminService.updateProject(editProjectId, projectData);
        alert('Project updated successfully');
        setIsEditingProject(false);
        setEditProjectId(null);
      } else {
        await adminService.createProject(projectData);
        alert('Project created successfully');
      }

      setProject({ title: '', description: '', startDate: '', endDate: '', owner: '' });
      fetchProjects();
    } catch (error) {
      console.error('Error creating/updating project:', error);
      alert('Failed to create/update project');
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const adminService = new AdminService();
    try {
      if (isEditingTask) {
        await adminService.updateTask(editTaskId, task);
        alert('Task updated successfully');
        setIsEditingTask(false);
        setEditTaskId(null);
      } else {
        await adminService.createTask(task);
        alert('Task created successfully');
      }

      setTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'LOW',
        employeeId: '',
        taskStatus: 'PENDING',
        projectId: ''
      });
      fetchTasks();
    } catch (error) {
      console.error('Error creating/updating task:', error);
      alert('Failed to create/update task');
    }
  };

  const handleDeleteProject = async (projectId) => {
    const adminService = new AdminService();
    try {
      await adminService.deleteProject(projectId);
      alert('Project deleted successfully');
      fetchProjects();
      fetchTasks();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const handleDeleteTask = async (taskId) => {
    const adminService = new AdminService();
    try {
      await adminService.deleteTask(taskId);
      alert('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    const formattedDueDate = task.dueDate.split('T')[0];
    setTask({
      title: task.title,
      description: task.description,
      dueDate: formattedDueDate,
      priority: task.priority,
      employeeId: task.employeeId,
      taskStatus: task.taskStatus,
      projectId: task.projectId
    });
    setIsEditingTask(true);
    setEditTaskId(task.id);
  };

  const handleEditProject = (project) => {
    const formattedStartDate = project.startDate.split('T')[0];
    const formattedEndDate = project.endDate.split('T')[0];
    setProject({
      title: project.title,
      description: project.description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      owner: project.ownerId
    });
    setIsEditingProject(true);
    setEditProjectId(project.id);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const adminService = new AdminService();
    try {
      const response = await adminService.searchTasks(searchTerm);
      setTasks(response.data);
      setIsSearching(true);
    } catch (error) {
      console.error('Error searching tasks:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowAllTasks = () => {
    setSearchTerm('');
    fetchTasks();
    setIsSearching(false);
  };

  return (
    <div className="admin-container">
      <h2>{isEditingProject ? 'Edit Project' : 'Create a New Project'}</h2>
      <form className="admin-form" onSubmit={handleProjectSubmit}>
        {/* Project form fields */}
        <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={handleProjectChange} required />
        <textarea name="description" placeholder="Project Description" value={project.description} onChange={handleProjectChange} required />
        <input type="date" name="startDate" placeholder="Start Date" value={project.startDate} onChange={handleProjectChange} required />
        <input type="date" name="endDate" placeholder="End Date" value={project.endDate} onChange={handleProjectChange} required />
        <select name="owner" value={project.owner} onChange={handleProjectChange} required>
          <option value="">Select Owner</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button type="submit">{isEditingProject ? 'Update Project' : 'Create Project'}</button>
      </form>

      <h2>{isEditingTask ? 'Edit Task' : 'Create a New Task'}</h2>
      <form className="admin-form" onSubmit={handleTaskSubmit}>
        {/* Task form fields */}
        <input type="text" name="title" placeholder="Task Title" value={task.title} onChange={handleTaskChange} required />
        <textarea name="description" placeholder="Task Description" value={task.description} onChange={handleTaskChange} required />
        <input type="date" name="dueDate" placeholder="Due Date" value={task.dueDate} onChange={handleTaskChange} required />
        <select name="priority" value={task.priority} onChange={handleTaskChange} required>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <select name="employeeId" value={task.employeeId} onChange={handleTaskChange} required>
          <option value="">Assign to Employee</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <select name="taskStatus" value={task.taskStatus} onChange={handleTaskChange} required>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select name="projectId" value={task.projectId} onChange={handleTaskChange} required>
          <option value="">Select Project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.title}</option>
          ))}
        </select>
        <button type="submit">{isEditingTask ? 'Update Task' : 'Create Task'}</button>
      </form>

      <div className="task-list-container">
        <h2>Task List</h2>
        <form onSubmit={handleSearch}>
          <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search tasks..." />
          <button type="submit">Search</button>
          {isSearching && <button type="button" onClick={handleShowAllTasks}>Show All Tasks</button>}
        </form>
      </div>

      <ProjectList
        projects={projects}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
        tasks={tasksList}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        users={users}
        loading={loading}
      />
    </div>
  );
};

export default Admin;
