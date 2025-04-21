const apiUrl = 'http://localhost:5029/Tasks'; // local API

// Load tasks when page loads
window.onload = fetchTasks;

// Fetch all tasks 
async function fetchTasks() {
    const loadingSection = document.getElementById('loading-section');
    const taskList = document.getElementById('task-list');

    loadingSection.style.display = 'block';
    taskList.innerHTML = '';

    let tasks = [];

    try {
        const response = await fetch(apiUrl);
        tasks = await response.json();
        loadingSection.style.display = 'none';
    } catch (error){
        console.error('Failed to fetch tasks:', error);
    } finally {
        loadingSection.style.display = 'none';
    }

    if (tasks.length === 0) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = 'No tasks yet. Add your first task!';
        li.style.textAlign = 'center';
        taskList.appendChild(li);
        return;
    }

    tasks.forEach(task => {
        const li= document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <small>${task.description}</small>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

//Add new task
document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = document.querySelector('#task-form button');

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();

    if (title && description) {
        submitButton.disabled = true;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, isCompleted: false})
            });

            if (response.ok){
                alert('✅ Task added successfully!');
            } else {
                alert('❌ Failed to add task.');
            }

            document.getElementById('title').value = '';
            document.getElementById('description').value = '';

            fetchTasks(); //Refresh the list
        } catch (error) {
            alert('❌ Error adding task.');
            console.error('Add task error:', error);
        } finally {
            submitButton.disabled = false;
        }
        
    }
});

// Delete a task 
async function deleteTask(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('✅ Task deleted successfully!');
        } else {
            alert('❌ Failed to delete task.');
        }

        fetchTasks(); // Refresh the list
    } catch (error) {
        alert('❌ Error deleting task.');
        console.error('Delete task error:', error);
    }
     
}