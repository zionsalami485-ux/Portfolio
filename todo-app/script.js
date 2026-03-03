const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks on page load
document.addEventlisterner("DOMContentLoaded", loadTasks);
addBtn.addEventListener("click", addTask);
function addtask () {
  const tasks = taskInput.value.trim();
  if (task === "") return;

  addTaskToUI(task);
  saveTasks(task);

  taskInput.value = "";
}

function addTaskToUI(task, completed = false) {
  const li = document.createElement("li");
  li.textContext = task;

  if (completed) li.classList.add("completed");

  // toggle completion on click
  li.classList.toggle("completed");
  updateLocalStorage();
});

// delete button
const delBtn = document.createElement("button");
delBtn.textContent = "X";
delBtn.classList.add("delete-btn");

delBtn.addEventListener("click", (e) =>) {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
});

li.appendChild(delBtn);
taskList.appendChild(li);
}

// Save to LocalStorage
function saveTask(task) {
  const tasks = getTasks();
  tasks.push({ text: task, completed: flase});
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
  
// Load saved tasks
function loadtasks() {
    const tasks = getTasks();
    tasks.forEach(t => addTaskToUI(t.text, t,completed));
}

// Get tasks from localStorage
function getTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
  