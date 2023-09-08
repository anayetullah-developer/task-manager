import { useState, useEffect } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    assignee: '',
    status: 'Not Started',
  });

  const [filterStatus, setFilterStatus] = useState('All'); // Filter tasks by status
  const [sortBy, setSortBy] = useState('dueDate'); // Sort tasks by default due date

  useEffect(() => {
    // Load tasks from local storage when the component mounts
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCreateTask = () => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask }]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low',
      assignee: '',
      status: 'Not Started',
    });
  };

  const handleTaskStatusChange = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const task = updatedTasks[index];

      if (task.status === 'Not Started') {
        task.status = 'In Progress';
      } else if (task.status === 'In Progress') {
        task.status = 'Completed';
      } else {
        task.status = 'Not Started';
      }

      return updatedTasks;
    });
  };

  // Filter tasks based on selected status
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'All') return true;
    return task.status === filterStatus;
  });

  // Sort tasks based on the selected criteria (e.g., dueDate, priority)
  filteredTasks.sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'priority') {
      const priorityOrder = { Low: 0, Medium: 1, High: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    // Add more sorting options as needed
    return 0;
  });

  return (
    <div className="w-3/5 mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Create Task</h2>
        <div className="flex flex-col space-y-2">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          />
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          />
          <label>Priority:</label>
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label>Assignee:</label>
          <input
            type="text"
            name="assignee"
            value={newTask.assignee}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          />
          <button onClick={handleCreateTask} className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Create Task
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Task List</h2>
        <div className="mb-4">
          {/* Filter tasks by status */}
          <label className="mr-2">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="All">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          {/* Sort tasks by criteria */}
          <label className="mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            {/* Add more sorting options as needed */}
          </select>
        </div>
        <ul className="list-disc pl-4">
          {filteredTasks.map((task, index) => (
            <li key={index} className="mb-2">
              {/* Display task details */}
              <strong>{task.title}</strong> - {task.description}
              <br />
              Due Date: {task.dueDate}, Priority: {task.priority}, Status: {task.status}, Assignee: {task.assignee}
              <button
                onClick={() => handleTaskStatusChange(index)}
                className={`ml-2 ${
                  task.status === 'Not Started'
                    ? 'bg-yellow-400'
                    : task.status === 'In Progress'
                    ? 'bg-blue-400'
                    : 'bg-green-400'
                } text-white py-1 px-2 rounded-md`}
              >
                {task.status === 'Not Started'
                  ? 'Start'
                  : task.status === 'In Progress'
                  ? 'Complete'
                  : 'Reset'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskManager;
