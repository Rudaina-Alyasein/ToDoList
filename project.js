var ToDoListForm = document.getElementById("ToDoListForm");
ToDoListForm === null || ToDoListForm === void 0 ? void 0 : ToDoListForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("Title").value;
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    if (!title || !startDate || !endDate) {
        alert("Please enter valid task details.");
        return;
    }
    var existingTasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    var newTask = {
        id: existingTasks.length > 0 ? existingTasks[existingTasks.length - 1].id + 1 : 1,
        title: title,
        states: "pending",
        startDate: startDate,
        endDate: endDate
    };
    existingTasks.push(newTask);
    localStorage.setItem("Tasks", JSON.stringify(existingTasks));
    document.getElementById("Title").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    var alertMessage = document.getElementById("alertMessage");
    alertMessage.style.display = "block";
    displayTasks();
});
function displayTasks() {
    var tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = "";
    var tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    tasks.forEach(function (task, index) {
        var taskDiv = document.createElement("div");
        taskDiv.className = "list-group-item d-flex justify-content-between align-items-center taskIem";
        taskDiv.style.backgroundColor = index % 2 === 0 ? "#dc3545 !important" : "#fff";
        taskDiv.style.padding = "10px";
        taskDiv.style.borderRadius = "5px";
        taskDiv.style.marginBottom = "10px";
        taskDiv.innerHTML = "\n            <div>\n                <h5 style=\"margin: 0;\">".concat(task.title, "</h5>\n                <p style=\"margin: 0; font-size: 14px;\">").concat(task.startDate, " - ").concat(task.endDate, "</p>\n                <span class=\"badge bg-").concat(task.states === "completed" ? "success" : "warning", "\">").concat(task.states, "</span>\n            </div>\n            <div style=\"display: flex; gap: 10px;\">\n                <input type=\"checkbox\" ").concat(task.states === "completed" ? "checked" : "", " \n                    onchange=\"toggleTaskState(").concat(task.id, ")\">\n                <button class=\"btn btn-sm DeleteButton\" onclick=\"deleteTask(").concat(task.id, ")\">\uD83D\uDDD1\uFE0F</button>\n            </div>\n        ");
        tasksContainer.appendChild(taskDiv);
    });
}
function toggleTaskState(taskId) {
    var tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    var filteredTasks = tasks.filter(function (t) { return t.id === taskId; });
    var task = filteredTasks.length > 0 ? filteredTasks[0] : null;
    if (task) {
        task.states = task.states === "pending" ? "completed" : "pending";
        localStorage.setItem("Tasks", JSON.stringify(tasks));
        displayTasks();
    }
}
function deleteTask(taskId) {
    var tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    tasks = tasks.filter(function (t) { return t.id !== taskId; });
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    displayTasks();
}
document.addEventListener("DOMContentLoaded", displayTasks);
// <button class="btn btn-sm btn-primary EditButton" onclick="editTask(${task.id})">✏️</button>
