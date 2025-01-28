// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // Selecting elements and storing them in constants
    const addButton = document.getElementById("add-task-btn");  // Button to add new tasks
    const taskInput = document.getElementById("task-input");    // Input field for entering tasks
    const taskList = document.getElementById("task-list");      // List where tasks will be displayed

    // Function to add a new task
    function addTask() {
        // Retrieve and trim the value from the input field
        const taskText = taskInput.value.trim();

        // Check if the task input is empty, and alert the user if it is
        if (taskText === "") {
            alert("Please enter a task!");  // Alert message for empty input
            return; // Exit the function if taskText is empty
        }

        // Create a new <li> element for the task
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;  // Set the text content of the list item

        // Create a "Remove" button for the task
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";  // Button label
        removeButton.className = "remove-btn";  // Assign a class name for styling

        // Assign an onclick event to the remove button to remove the task
        removeButton.onclick = function () {
            taskList.removeChild(taskItem);  // Remove the task when the button is clicked
        };

        // Append the remove button to the <li> element
        taskItem.appendChild(removeButton);

        // Append the <li> task item to the task list
        taskList.appendChild(taskItem);

        // Clear the input field after adding the task
        taskInput.value = "";
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

    // Invoke addTask when the DOM is fully loaded (if needed for data fetching or initial tasks)
    addTask();  // Uncomment if you want to load tasks when the page is ready
});
