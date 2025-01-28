// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // Selecting elements and storing them in constants
    const addButton = document.getElementById("add-task-btn");  // Button to add new tasks
    const taskInput = document.getElementById("task-input");    // Input field for entering tasks
    const taskList = document.getElementById("task-list");      // List where tasks will be displayed

    // get tasks array from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // Retrieve/start with an empty array

    // Function to add a new task
    function addTask() {
        // Retrieve and trim the value 
        const taskText = taskInput.value.trim();

        // alert the user if task input is empty
        if (taskText === "") {
            alert("Please enter a task!");  // Alert message 
            return; // Exit if taskText is empty
        }

        // Create a new <li> element for the tasks
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;  // Set the text content of the list item

        // "Remove" button for the task
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";  // Button label
        removeButton.className = "remove-btn";  // Assign a class name for styling

        // Assign an onclick event to the remove button to remove the task
        removeButton.onclick = function () {
            taskList.removeChild(taskItem);  // Remove the task when the button is clicked
            tasks = tasks.filter(task => task !== taskText);  // Remove task from tasks array
            updateLocalStorage();  // Updates localStorage when task removed
        };

        // Append the remove button to the <li> element
        taskItem.appendChild(removeButton);

        // Append the <li> task item to the task list
        taskList.appendChild(taskItem);

        // Add the new task to the tasks array
        tasks.push(taskText);

        // Save the updated tasks array back to localStorage
        updateLocalStorage();

        // Clear the input field after adding the task
        taskInput.value = "";
    }

    // Function to update the task list in localStorage
    function updateLocalStorage() {
        // Store the tasks array in localStorage as a JSON string
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage and display them
    function loadTasks() {
        if (tasks) {
            tasks.forEach(taskText => {
                // Create a new <li> element for each task from localStorage
                const taskItem = document.createElement("li");
                taskItem.textContent = taskText;

                // Create a "Remove" button for the task
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.className = "remove-btn";

                // Assign an onclick event to remove the task
                removeButton.onclick = function () {
                    taskList.removeChild(taskItem);  // Remove the task when the button is clicked
                    tasks = tasks.filter(task => task !== taskText);  // Remove task from tasks array
                    updateLocalStorage();  // Update localStorage after task removal
                };

                // Append the remove button to the <li> element
                taskItem.appendChild(removeButton);

                // Append the <li> task item to the task list
                taskList.appendChild(taskItem);
            });
        }
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener("click", addTask);

    // Event listener for pressing the "Enter" key to add a task
    taskInput.addEventListener("keypress", function (event) {
        // Check if the "Enter" key is pressed
        if (event.key === "Enter") {
            addTask();  // Call the addTask function to add the task
        }
    });

    // Load tasks from localStorage when the DOM is fully loaded
    loadTasks();
});
