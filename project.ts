interface Task {
    id: number;
    title: string;
    states: string;
    startDate: string;
    endDate: string;
}

const ToDoListForm: HTMLFormElement | null = document.getElementById("ToDoListForm") as HTMLFormElement;

ToDoListForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = (document.getElementById("Title") as HTMLInputElement).value;
    const startDate = (document.getElementById("startDate") as HTMLInputElement).value;
    const endDate = (document.getElementById("endDate") as HTMLInputElement).value;

    if (!title || !startDate || !endDate) {
        alert("Please enter valid task details.");
        return;
    }

    const existingTasks: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");

    const newTask: Task = {
        id: existingTasks.length > 0 ? existingTasks[existingTasks.length - 1].id + 1 : 1,
        title,
        states: "pending", 
        startDate,
        endDate
    };

    existingTasks.push(newTask);

    localStorage.setItem("Tasks", JSON.stringify(existingTasks));

    (document.getElementById("Title") as HTMLInputElement).value = "";
    (document.getElementById("startDate") as HTMLInputElement).value = "";
    (document.getElementById("endDate") as HTMLInputElement).value = "";
const  alertMessage=document.getElementById("alertMessage") as HTMLInputElement;
    alertMessage.style.display = "block";
    displayTasks();

});

function displayTasks() {
    const tasksContainer = document.getElementById("tasksContainer") as HTMLElement;
    tasksContainer.innerHTML = ""; 

    const tasks: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "list-group-item d-flex justify-content-between align-items-center taskIem";
        taskDiv.style.backgroundColor = index % 2 === 0 ? "#dc3545 !important" : "#fff"; 
        taskDiv.style.padding = "10px";
        taskDiv.style.borderRadius = "5px";
        taskDiv.style.marginBottom = "10px";

        taskDiv.innerHTML = `
            <div>
                <h5 style="margin: 0;">${task.title}</h5>
                <p style="margin: 0; font-size: 14px;">${task.startDate} - ${task.endDate}</p>
                <span class="badge bg-${task.states === "completed" ? "success" : "warning"}">${task.states}</span>
            </div>
            <div style="display: flex; gap: 10px;">
                <input type="checkbox" ${task.states === "completed" ? "checked" : ""} 
                    onchange="toggleTaskState(${task.id})">
                <button class="btn btn-sm DeleteButton" onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;

        tasksContainer.appendChild(taskDiv);
    });
}

function toggleTaskState(taskId: number) {
    const tasks: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");
    const filteredTasks = tasks.filter(t => t.id === taskId);
    const task = filteredTasks.length > 0 ? filteredTasks[0] : null;
        if (task) {
        task.states = task.states === "pending" ? "completed" : "pending";
        localStorage.setItem("Tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

function deleteTask(taskId: number) {
    let tasks: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    displayTasks();
}






document.addEventListener("DOMContentLoaded", displayTasks);
// <button class="btn btn-sm btn-primary EditButton" onclick="editTask(${task.id})">✏️</button>
