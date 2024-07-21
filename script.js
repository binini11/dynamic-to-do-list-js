document.addEventListener('DOMContentLoaded', function() {
    
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    
    let tasks = [];

    
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                createTaskElement(task);
            });
        }
    }

    
    function addTask() {
        
        const taskText = taskInput.value.trim();

        
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        
        tasks.push(taskText);
        saveTasks();

        
        createTaskElement(taskText);

        
        taskInput.value = "";
    }

    
    function createTaskElement(taskText) {
        
        const li = document.createElement('li');
        li.textContent = taskText;

        
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTask(taskText);
        };

        
        li.appendChild(removeButton);

        
        taskList.appendChild(li);
    }

    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
    function removeTask(taskText) {
        tasks = tasks.filter(task => task !== taskText);
        saveTasks();
    }

    
    addButton.addEventListener('click', addTask);

    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    
    loadTasks();
});
