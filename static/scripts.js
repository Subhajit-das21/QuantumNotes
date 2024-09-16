document.addEventListener('DOMContentLoaded', () => {
    // Notes Section
    const addNoteButton = document.getElementById('add-note');
    const notesSection = document.getElementById('notes-section');
    const sectionTitle = document.getElementById('section-title');

    if (addNoteButton && notesSection) {
        addNoteButton.addEventListener('click', () => {
            const noteTitle = prompt("Enter note title:");
            const noteContent = prompt("Enter note content:");

            if (noteTitle && noteContent) {
                const noteCard = document.createElement('div');
                noteCard.classList.add('note-card');
                noteCard.innerHTML = `
                    <div class="nav-arrows">
                        <span class="back-arrow">&#9664;</span>
                        <span class="next-arrow">&#9654;</span>
                    </div>
                    <h3>${noteTitle}</h3>
                    <p>${noteContent}</p>
                    <button class="delete-button">Delete</button>
                `;
                notesSection.appendChild(noteCard);

                // Handle note card click for expanded view
                noteCard.addEventListener('click', () => {
                    if (!noteCard.classList.contains('expanded')) {
                        document.querySelectorAll('.note-card').forEach(card => {
                            if (card !== noteCard) {
                                card.classList.add('hidden');
                            }
                        });
                        noteCard.classList.add('expanded');
                        sectionTitle.textContent = `${noteTitle} - Full View`;
                    }
                });

                // Handle back arrow click
                noteCard.querySelector('.back-arrow').addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent click event from propagating to the card
                    document.querySelectorAll('.note-card').forEach(card => {
                        card.classList.remove('hidden');
                    });
                    noteCard.classList.remove('expanded');
                    sectionTitle.textContent = 'Notes';
                });

                // Handle next arrow click
                noteCard.querySelector('.next-arrow').addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent click event from propagating to the card
                    const nextCard = noteCard.nextElementSibling;
                    if (nextCard) {
                        document.querySelectorAll('.note-card').forEach(card => {
                            card.classList.add('hidden');
                        });
                        noteCard.classList.remove('expanded');
                        nextCard.classList.remove('hidden');
                        nextCard.classList.add('expanded');
                        sectionTitle.textContent = `${nextCard.querySelector('h3').textContent} - Full View`;
                    }
                });

                // Handle delete button click
                noteCard.querySelector('.delete-button').addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent click event from propagating to the card
                    if (confirm('Are you sure you want to delete this note?')) {
                        notesSection.removeChild(noteCard);
                        if (document.querySelectorAll('.note-card').length === 0) {
                            sectionTitle.textContent = 'Notes';
                        }
                    }
                });
            }
        });
    } else {
        console.error('Add Note button or Notes section not found');
    }

    // Task Section (To-do list)
    const addTaskButton = document.getElementById('add-task');
    const tasksList = document.getElementById('tasks-list');

    if (addTaskButton && tasksList) {
        addTaskButton.addEventListener('click', () => {
            const taskDescription = prompt("Enter task description:");
            const taskDate = prompt("Enter due date (YYYY-MM-DD):");

            if (taskDescription && taskDate) {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task-item');
                taskDiv.innerHTML = `
                    <input type="radio" name="task-status" id="task-${Date.now()}">
                    <label for="task-${Date.now()}">${taskDescription} - Due: ${taskDate}</label>
                    <button class="delete-button">Delete</button>
                `;
                tasksList.appendChild(taskDiv);

                // Handle delete button click
                taskDiv.querySelector('.delete-button').addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent click event from propagating to the task div
                    if (confirm('Are you sure you want to delete this task?')) {
                        tasksList.removeChild(taskDiv);
                    }
                });
            }
        });
    } else {
        console.error('Add Task button or Tasks list not found');
    }

    // Function to show tasks based on view type
    window.showTasks = (viewType) => {
        // Logic to filter tasks based on viewType (day, week, month) can be implemented here
        console.log(`Showing tasks for ${viewType}`);
    };

    // Pomodoro Timer
    let pomodoroInterval;
    const startPomodoroTimer = () => {
        let minutes = 25;
        let seconds = 0;

        pomodoroInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(pomodoroInterval);
                    alert('Pomodoro finished! Take a break.');
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
            document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
        }, 1000);
    };

    const resetPomodoroTimer = () => {
        clearInterval(pomodoroInterval);
        document.getElementById('minutes').textContent = '25';
        document.getElementById('seconds').textContent = '00';
    };

    document.getElementById('start-timer').addEventListener('click', startPomodoroTimer);
    document.getElementById('reset-timer').addEventListener('click', resetPomodoroTimer);

    // AI Chatbot
    const aiMessages = [
        "Hello! What do you want to learn today?",
        "I can ask you questions or generate questions for practice!",
        "Feel free to ask me anything!"
    ];

    const chatbotSendMessage = (message, fromUser = false) => {
        const messagesDiv = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.classList.add(fromUser ? 'user-message' : 'ai-message');
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    chatbotSendMessage(aiMessages[0]);

    document.getElementById('send-message').addEventListener('click', () => {
        const userInput = document.getElementById('user-input');
        const userMessage = userInput.value;
        if (userMessage.trim()) {
            chatbotSendMessage(userMessage, true);
            // Here you can add more sophisticated AI responses
            chatbotSendMessage(aiMessages[Math.floor(Math.random() * aiMessages.length)]);
            userInput.value = '';
        }
    });
});
