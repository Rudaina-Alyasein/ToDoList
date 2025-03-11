// Form and container elements
var ToDoListForm = document.getElementById("ToDoListForm");
var tasksContainer = document.getElementById("tasksContainer");
var editingTaskId = null;
// Handle form submission to add or update task
ToDoListForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("Title").value.trim();
    var startDate = document.getElementById("startDate").value.trim();
    var endDate = document.getElementById("endDate").value.trim();
    // Check if any field is empty
    if (!title || !startDate || !endDate) {
        alert("Please fill all fields!");
        return;
    }
    // Retrieve existing tasks from localStorage or initialize empty array
    var tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    if (editingTaskId !== null) {
        // Update existing task
        var taskIndex = getTaskIndexById(editingTaskId); // Get task index using loop
        if (taskIndex !== -1) {
            tasks[taskIndex].title = title;
            tasks[taskIndex].startDate = startDate;
            tasks[taskIndex].endDate = endDate;
            // Save updated tasks to localStorage
            localStorage.setItem("Tasks", JSON.stringify(tasks));
            // Reset the form and change the button back to "Add Task"
            ToDoListForm.reset();
            var submitButton = document.querySelector(".btn-custom");
            submitButton.textContent = "Add Task";
            editingTaskId = null; // Clear the task being edited
        }
    }
    else {
        // Add new task
        var newTask = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            title: title,
            startDate: startDate,
            endDate: endDate,
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem("Tasks", JSON.stringify(tasks));
        // Reset the form and update task list
        ToDoListForm.reset();
    }
    displayTasks();
});
// Display tasks from localStorage
function displayTasks() {
    tasksContainer.innerHTML = ""; // Clear the container
    // Get tasks from localStorage
    var tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    if (tasks.length === 0) {
        tasksContainer.innerHTML = "<p>No tasks available.</p>";
        return;
    }
    // Loop through tasks and create HTML elements for each one
    tasks.forEach(function (task) {
        var _a;
        var taskDiv = document.createElement("div");
        taskDiv.classList.add("taskItem");
        taskDiv.innerHTML = "\n            <div>\n                <input type=\"checkbox\" class=\"task-checkbox\" style=\"accent-color: #dc3545!important\"\n                 data-id=\"".concat(task.id, "\" ").concat(task.completed ? "checked" : "", " />\n                <span class=\"task-title ").concat(task.completed ? "text-decoration-line-through" : "", "\">").concat(task.title, "</span>\n                <p>").concat(task.startDate, " - ").concat(task.endDate, "</p>\n            </div>\n            <div>\n                        <i class=\"fas fa-edit editButton\" onclick=\"editTask(").concat(task.id, ")\" style=\"cursor: pointer; color: ").concat(task.id % 2 === 0 ? '#f8f9fa' : 'black', ";\"></i>\n        <i class=\"fas fa-trash-alt deleteButton\" onclick=\"deleteTask(").concat(task.id, ")\" style=\"cursor: pointer; color: ").concat(task.id % 2 === 0 ? 'rgb(1, 1, 1)' : '#dc3545', ";\"></i>\n            </div>\n        ");
        // Add event listener to checkbox for completion status
        (_a = taskDiv.querySelector(".task-checkbox")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function (event) {
            toggleTaskCompletion(task.id);
        });
        tasksContainer.appendChild(taskDiv);
    });
}
// Toggle task completion
function toggleTaskCompletion(taskId) {
    var tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    var taskIndex = getTaskIndexById(taskId); // Using custom function to get index
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem("Tasks", JSON.stringify(tasks));
        displayTasks();
    }
}
// Delete a task by ID
function deleteTask(taskId) {
    var tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    tasks = tasks.filter(function (task) { return task.id !== taskId; }); // Using filter to remove the task
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    displayTasks();
}
// Edit task by ID
function editTask(taskId) {
    var tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    var taskIndex = getTaskIndexById(taskId); // Using custom function to get index
    if (taskIndex !== -1) {
        var task = tasks[taskIndex];
        var titleInput = document.getElementById("Title");
        var startDateInput = document.getElementById("startDate");
        var endDateInput = document.getElementById("endDate");
        // Ensure inputs are filled with task values
        titleInput.value = task.title;
        startDateInput.value = task.startDate;
        endDateInput.value = task.endDate;
        // Change button text to "Save Task" for editing mode
        var submitButton = document.querySelector(".btn-custom");
        submitButton.textContent = "Edit Task";
        // Set the task being edited
        editingTaskId = taskId;
    }
}
// Function to get task index by ID using a loop
function getTaskIndexById(taskId) {
    var tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            return i; // Return the index of the found task
        }
    }
    return -1; // If task not found, return -1
}
// Display tasks when page loads
document.addEventListener("DOMContentLoaded", displayTasks);
