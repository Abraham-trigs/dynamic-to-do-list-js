// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function () {
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn'); // The 'Add Task' button
    const taskInput = document.getElementById('task-input'); // The input field for tasks
    const taskList = document.getElementById('task-list'); // The list where tasks will be displayed

    // Step 3: Create the addTask Function
    function addTask() {
        // Retrieve and trim the task input value
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText !== "") {
            // Step 4: Task Creation and Removal
            // Create a new list item (li) for the task
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;
            
            // Add a class for styling the task
            taskItem.classList.add('task-item'); // Add 'task-item' class for styling

            // Create the 'Remove' button
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = 'remove-btn';

            // Add class for styling the remove button
            removeButton.classList.add('remove-btn-style'); // Add class for styling

            // Attach an event listener to remove the task when clicked
            removeButton.addEventListener('click', function () {
                taskList.removeChild(taskItem); // Remove the task item
            });

            // Append the remove button to the task item (li)
            taskItem.appendChild(removeButton);

            // Append the task item to the task list (ul)
            taskList.appendChild(taskItem);

            // Step 5: Clear the input field
            taskInput.value = "";
        } else {
            // Alert if the task input is empty
            alert("Please enter a task!");
        }
    }

    // Step 6: Attach Event Listeners
    // Add event listener to the 'Add Task' button
    addButton.addEventListener('click', addTask);

    // Add event listener to the task input field to allow adding tasks with "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
