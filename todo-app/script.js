const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));
};

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task === "") return;
  addTask(task, false);
  saveTasks();
  taskInput.value = "";
});

function addTask(taskText, completed) {
  const li = document.createElement("li");

  li.innerHTML = `
    <span class="task ${completed ? "completed" : ""}">${taskText}</span>
    <button class="deleteBtn">X</button>
  `;

  // Toggle complete
  li.querySelector(".task").addEventListener("click", () => {
    li.querySelector(".task").classList.toggle("completed");
    saveTasks();
  });

  // Delete task
  li.querySelector(".deleteBtn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

// Save to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task").innerText,
      completed: li.querySelector(".task").classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}