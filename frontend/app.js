const apiUrl = 'http://localhost:5029/Tasks'; // Local API

// Load tasks when page loads
window.onload = fetchTasks;

// Function to show soft messages
function showMessage(text, type = 'success') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;

    messageDiv.className = '';

    if (type === 'success') {
        messageDiv.classList.add('message-success');
    }
    else {
        messageDiv.classList.add('message-error');
    }

    messageDiv.style.display = 'block';

    // Optional: Clear message after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.textContent = '';
        messageDiv.textContent = '';
    }, 3000);
}

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
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        showMessage('❌ Failed to load tasks.', 'error');
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

    // Sort tasks: incomplete first, completed last
    tasks.sort((a,b) => a.isCompleted - b.isCompleted);

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.isCompleted) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" ${task.isCompleted ? 'checked' : ''} onchange="toggleCompletion(${task.id}, this.checked)">
                <div>
                    <strong>${task.title}</strong><br>
                    <small>${task.description}</small>
                </div>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add new task
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
                body: JSON.stringify({ title, description, isCompleted: false })
            });

            if (response.ok) {
                showMessage('✅ Task added successfully!', 'success');
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                fetchTasks(); // Refresh the list
            } else {
                showMessage('❌ Failed to add task.', 'error');
            }
        } catch (error) {
            showMessage('❌ Error adding task.', 'error');
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
            showMessage('✅ Task deleted successfully!', 'success');
            fetchTasks(); // Refresh the list
        } else {
            showMessage('❌ Failed to delete task.', 'error');
        }
    } catch (error) {
        showMessage('❌ Error deleting task.', 'error');
        console.error('Delete task error:', error);
    }
}

async function toggleCompletion(id, isCompleted) {
    try {
        // First, fetch the existing task details
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch task for update.');

        const task = await response.json();

        // Then, send the updated task with new isCompleted value
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: task.id,
                title: task.title,
                description: task.description,
                isCompleted: isCompleted
            })
        });
        fetchTasks(); // Refresh list
    } catch (error) {
        console.error('Error updating task completion:', error);
    }
}
