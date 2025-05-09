let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("task-input").value.trim();
  const dueDate = document.getElementById("due-date").value;
  const category = document.getElementById("category").value;

  if (!text) {
    alert("Please enter a task");
    return;
  }

  const task = {
    text,
    dueDate,
    category,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  document.getElementById("task-input").value = "";
  document.getElementById("due-date").value = "";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function renderTasks(filter = "all") {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (filter === "completed" && !task.completed) ||
      (filter === "pending" && task.completed)
    )
      return;

    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");

    li.innerHTML = `
      <div class="info">
        <strong>${task.text}</strong> 
        <span class="category ${task.category}">${task.category}</span>
        <small>Due: ${task.dueDate || "N/A"}</small>
      </div>
      <div class="action-buttons">
        <button class="complete-btn" onclick="toggleComplete(${index})">✓</button>
        <button class="delete-btn" onclick="deleteTask(${index})">X</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function filterTasks(type) {
  renderTasks(type);
}

renderTasks();
