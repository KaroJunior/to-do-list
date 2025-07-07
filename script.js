// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from LocalStorage when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task on button click
addTaskBtn.addEventListener('click', addTask);

// Add task on Enter key
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
  displayTask(task);

  taskInput.value = '';
}

// Display a single task in the UI
function displayTask(task) {
  const li = document.createElement('li');
  li.className = 'task';
  if (task.completed) li.classList.add('completed');
  li.setAttribute('data-id', task.id);

  li.innerHTML = `
    <span>${task.text}</span>
    <div class="task-buttons">
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  // Complete task
  li.querySelector('.complete-btn').addEventListener('click', () => {
    toggleComplete(task.id);
  });

  // Delete task
  li.querySelector('.delete-btn').addEventListener('click', () => {
    deleteTask(task.id);
  });

  taskList.appendChild(li);
}

// Toggle task completion
function toggleComplete(id) {
  const tasks = getTasksFromStorage();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasksToStorage(tasks);
    refreshTasks();
  }
}

// Delete task
function deleteTask(id) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(t => t.id !== id);
  saveTasksToStorage(tasks);
  refreshTasks();
}

// Load and display all tasks
function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(displayTask);
}

// Refresh task list in UI
function refreshTasks() {
  taskList.innerHTML = '';
  loadTasks();
}

// Get tasks from LocalStorage
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save tasks to LocalStorage
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
