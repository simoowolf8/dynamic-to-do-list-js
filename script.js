// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    loadTasks(); // Load tasks from Local Storage on page load

    // Get references to DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Check if essential elements are present in the DOM
    if (!addButton) {
        console.error('Add button is missing in the DOM.');
        return;
    }
    if (!taskInput) {
        console.error('Task input is missing in the DOM.');
        return;
    }
    if (!taskList) {
        console.error('Task list is missing in the DOM.');
        return;
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get tasks from Local Storage
        storedTasks.forEach(task => addTask(task.task, false)); // Add each task to the list
    }

    // Function to add a task to the list and Local Storage
    function addTask(taskText, save = true) {
        const taskTextTrimmed = taskText.trim(); // Remove extra spaces
        if (taskTextTrimmed === "") { // Check if the task text is empty
            alert("Please enter a task."); // Alert if empty
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskTextTrimmed; // Set the text of the list item

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove'; // Set button text
        removeButton.className = 'remove-btn'; // Add a class for styling

        // Add an event listener for the remove button
        removeButton.addEventListener('click', function() {
            taskList.removeChild(li); // Remove the task from the list
            removeTaskFromStorage(taskTextTrimmed); // Remove from Local Storage
        });

        li.appendChild(removeButton); // Add the remove button to the list item
        taskList.appendChild(li); // Add the list item to the task list

        // Save the new task to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get current tasks from Local Storage
            const newTask = { id: storedTasks.length + 1, task: taskTextTrimmed, completed: false }; // Create a new task object
            storedTasks.push(newTask); // Add the new task to the array
            localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save updated tasks back to Local Storage
        }

        taskInput.value = ''; // Clear the input field after adding the task
    }

    // Event listener for the add button to add a task when clicked
    addButton.addEventListener('click', function() {
        addTask(taskInput.value); // Add the task from the input field
    });

    // Event listener for the input field to add a task when pressing Enter
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { // Check if the Enter key is pressed
            addTask(taskInput.value); // Add the task from the input field
        }
    });

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get current tasks from Local Storage
        // Filter out the task to remove it
        storedTasks = storedTasks.filter(task => task.task !== taskText); 
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update Local Storage with the new array
    }
});
