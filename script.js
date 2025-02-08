    // Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM Elements

    const addButton = document.getElementById('add-task-btn'); // The 'Add Task' button
    const taskInput = document.getElementById('task-input'); // The input field for tasks
    const taskList = document.getElementById('task-list'); // The list where tasks will be displayed

    // Initialize tasks array from Local Storage or empty array if no tasks exist
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Step 3: Load Tasks from Local Storage
    function loadTasks() {
        taskList.innerHTML = ''; // Clear the list before loading tasks
        tasks.forEach(task => {
            // Create task item (li)
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;

            // Add class for styling the task item
            taskItem.classList.add('task-item');

            // Create the 'Remove' button
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = 'remove-btn-style';

            // Attach event listener to remove the task from DOM and Local Storage
            removeButton.addEventListener('click', function () {
                removeTask(taskItem, task.id); // Remove task using its id
            });

            // Append the remove button to the task item
            taskItem.appendChild(removeButton);

            // Append the task item to the task list (ul)
            taskList.appendChild(taskItem);
        });
    }

    // Step 4: Create the addTask Function
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const task = {
                id: Date.now(), // Unique ID based on timestamp
                text: taskText
            };

            // Add the new task to the tasks array
            tasks.push(task);

            // Save the updated tasks array to Local Storage
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // Reload tasks to update the UI
            loadTasks();

            // Clear the input field
            taskInput.value = "";
        } else {
            alert("Please enter a task!");
        }
    }

    // Step 5: Implement Task Removal with Local Storage Update
    function removeTask(taskItem, taskId) {
        // Remove task from tasks array based on id
        tasks = tasks.filter(task => task.id !== taskId);

        // Update Local Storage with the new tasks array
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Remove the task item from the DOM
        taskList.removeChild(taskItem);
    }

    // Step 6: Attach Event Listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Step 7: Load existing tasks from Local Storage when the page loads
    loadTasks();
});
