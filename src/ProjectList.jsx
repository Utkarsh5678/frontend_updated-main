import React from 'react';


const ProjectList = ({ projects, onEditProject, onDeleteProject, tasks, onEditTask, onDeleteTask, users, loading }) => {
  const getTasksForProject = (projectId) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getUserById = (id) => {
    const user = users.find(user => user.id === id);
    return user ? user.name : 'Unknown';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>Start Date: {project.startDate}</p>
          <p>End Date: {project.endDate}</p>
          <p>Owner: {project.ownerName}</p>
          <button onClick={() => onEditProject(project)}>Edit</button>
          <button onClick={() => onDeleteProject(project.id)}>Delete</button>
          
          <h4>Tasks</h4>
          {getTasksForProject(project.id).length > 0 ? (
            <ul>
              {getTasksForProject(project.id).map(task => (
                <li key={task.id}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Due Date: {task.dueDate}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Assigned To: {getUserById(task.employeeId)}</p>
                  <p>Status: {task.taskStatus}</p>
                  <div className="task-actions">
                    <button onClick={() => onEditTask(task)}>Edit</button>
                    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this project</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
