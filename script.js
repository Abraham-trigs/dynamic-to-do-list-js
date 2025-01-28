document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks or set an empty array
        tasks.forEach(task => addTaskToDOM(task)); // Add each task to the UI
    }

    // Save tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert array to string and store
    }

    // Add task to the DOM with a remove button
    function addTaskToDOM(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-task');
        removeBtn.addEventListener('click', () => removeTask(taskText, li));

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Add new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return; // Ignore empty input

        addTaskToDOM(taskText); // Add task to UI

        // Get existing tasks, add the new task, then save back to localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        saveTasks(tasks);

        taskInput.value = ''; // Clear input field
    }

    // Remove task
    function removeTask(taskText, taskElement) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText); // Remove task from array
        saveTasks(tasks); // Save updated tasks to localStorage

        taskElement.remove(); // Remove from DOM
    }

    addTaskBtn.addEventListener('click', addTask);
    loadTasks(); // Load tasks when page loads
});
