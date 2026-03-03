const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const categorySelect = document.getElementById("category");
const clearAllBtn = document.getElementById("clearAll");
const taskCount = document.getElementById("taskCount");
const themeToggle = document.getElementById("themeToggle");

// ---------- LOAD EVERYTHING ----------
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateCount();

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";
    }
});

// ---------- ADD TASK ----------
addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const category = categorySelect.value;

    if (!task) return;

    addTaskToUI(task, category);
    saveTask(task, category);

    taskInput.value = "";
    updateCount();
});

// ---------- CREATE UI TASK ----------
function addTaskToUI(text, category, completed = false) {
    const li = document.createElement("li");
    if (completed) li.classList.add("completed");

    const spanCategory = document.createElement("span");
    spanCategory.className = `category-tag ${category}`;
    spanCategory.textContent = category;

    const textNode = document.createElement("span");
    textNode.textContent = text;

    li.appendChild(spanCategory);
    li.appendChild(textNode);

    // toggle completed
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateLocalStorage();
        updateCount();
    });

    // delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("delete-btn");

    delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateLocalStorage();
        updateCount();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
}

// ---------- LOCAL STORAGE ----------
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTask(text, category) {
    const tasks = getTasks();
    tasks.push({ text, category, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(t => {
        addTaskToUI(t.text, t.category, t.completed);
    });
}

function updateLocalStorage() {
    const tasks = [];

    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.children[1].textContent,
            category: li.children[0].textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---------- CLEAR ALL ----------
clearAllBtn.addEventListener("click", () => {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
    updateCount();
});

// ---------- TASK COUNTER ----------
function updateCount() {
    const total = document.querySelectorAll("li").length;
    taskCount.textContent = `${total} tasks`;
}

// ---------- THEME TOGGLE ----------
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});