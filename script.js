window.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

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

    function addTask() {
        const taskText = taskInput ? taskInput.value.trim() : '';
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);

        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});