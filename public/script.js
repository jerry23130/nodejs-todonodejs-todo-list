document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/") {
        loadTasks();
    }
});

function loadTasks() {
    fetch("/tasks")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.text;
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    
    if (task) {
        fetch("/add-task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task })
        })
        .then(response => response.json())
        .then(() => {
            taskInput.value = "";
            window.location.href = "/"; // Redirect back to home
        });
    }
}
