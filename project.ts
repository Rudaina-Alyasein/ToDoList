// Define a structure for the Task
interface Task {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    completed: boolean; // To track if task is completed
}

// Form and container elements
const ToDoListForm = document.getElementById("ToDoListForm") as HTMLFormElement;
const tasksContainer = document.getElementById("tasksContainer") as HTMLDivElement;

let editingTaskId: number | null = null;

// Handle form submission to add or update task
ToDoListForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = (document.getElementById("Title") as HTMLInputElement).value.trim();
    const startDate = (document.getElementById("startDate") as HTMLInputElement).value.trim();
    const endDate = (document.getElementById("endDate") as HTMLInputElement).value.trim();

    // Check if any field is empty
    if (!title || !startDate || !endDate) {
        alert("Please fill all fields!");
        return;
    }

    // Retrieve existing tasks from localStorage or initialize empty array
    const tasks: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");

    if (editingTaskId !== null) {
        // Update existing task
        const taskIndex = getTaskIndexById(editingTaskId); // Get task index using loop

        if (taskIndex !== -1) {
            tasks[taskIndex].title = title;
            tasks[taskIndex].startDate = startDate;
            tasks[taskIndex].endDate = endDate;

            // Save updated tasks to localStorage
            localStorage.setItem("Tasks", JSON.stringify(tasks));

            // Reset the form and change the button back to "Add Task"
            ToDoListForm.reset();
            const submitButton = document.querySelector(".btn-custom") as HTMLButtonElement;
            submitButton.textContent = "Add Task";
            editingTaskId = null; // Clear the task being edited
        }
    } else {
        // Add new task
        const newTask: Task = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            title,
            startDate,
            endDate,
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
    const tasks: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");

    if (tasks.length === 0) {
        tasksContainer.innerHTML = "<p>No tasks available.</p>";
        return;
    }

    // Loop through tasks and create HTML elements for each one
    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("taskItem");

        taskDiv.innerHTML = `
            <div>
                <input type="checkbox" class="task-checkbox" style="accent-color: #dc3545!important"
                 data-id="${task.id}" ${task.completed ? "checked" : ""} />
                <span class="task-title ${task.completed ? "text-decoration-line-through" : ""}">${task.title}</span>
                <p>${task.startDate} - ${task.endDate}</p>
            </div>
            <div>
                        <i class="fas fa-edit editButton" onclick="editTask(${task.id})" style="cursor: pointer; color: ${task.id % 2 === 0 ? '#f8f9fa' : 'black'};"></i>
        <i class="fas fa-trash-alt deleteButton" onclick="deleteTask(${task.id})" style="cursor: pointer; color: ${task.id % 2 === 0 ? 'rgb(1, 1, 1)' : '#dc3545'};"></i>
            </div>
        `;

        // Add event listener to checkbox for completion status
        taskDiv.querySelector(".task-checkbox")?.addEventListener("change", (event) => {
            toggleTaskCompletion(task.id);
        });

        tasksContainer.appendChild(taskDiv);
    });
}

// Toggle task completion
function toggleTaskCompletion(taskId: number) {
    let tasks: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");

    const taskIndex = getTaskIndexById(taskId); // Using custom function to get index

    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem("Tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

// Delete a task by ID
function deleteTask(taskId: number) {
    let tasks: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");

    tasks = tasks.filter(task => task.id !== taskId); // Using filter to remove the task

    localStorage.setItem("Tasks", JSON.stringify(tasks));
    displayTasks();
}

// Edit task by ID
function editTask(taskId: number) {
    const tasks: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");

    const taskIndex = getTaskIndexById(taskId); // Using custom function to get index

    if (taskIndex !== -1) {
        const task = tasks[taskIndex];
        const titleInput = document.getElementById("Title") as HTMLInputElement;
        const startDateInput = document.getElementById("startDate") as HTMLInputElement;
        const endDateInput = document.getElementById("endDate") as HTMLInputElement;

        // Ensure inputs are filled with task values
        titleInput.value = task.title;
        startDateInput.value = task.startDate;
        endDateInput.value = task.endDate;

        // Change button text to "Save Task" for editing mode
        const submitButton = document.querySelector(".btn-custom") as HTMLButtonElement;
        submitButton.textContent = "Edit Task";

        // Set the task being edited
        editingTaskId = taskId;
    }
}

// Function to get task index by ID using a loop
function getTaskIndexById(taskId: number): number {
    const tasks: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            return i; // Return the index of the found task
        }
    }
    return -1; // If task not found, return -1
}

// Display tasks when page loads
document.addEventListener("DOMContentLoaded", displayTasks);
