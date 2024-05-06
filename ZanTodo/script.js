// Task 1: Rendering High Priority Tasks
const highPriorityTasks = [
    { id: 1, title: 'Complete project proposal', date: '2024-05-01' },
    { id: 2, title: 'Prepare for presentation', date: '2024-05-03' },
    { id: 3, title: 'Finish coding feature A', date: '2024-05-05' }
];

const highPriorityTasksContainer = document.querySelector('.high-priority-tasks ul');

function renderHighPriorityTasks(tasks) {
    highPriorityTasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = `${task.title} - ${task.date}`;
        highPriorityTasksContainer.appendChild(listItem);
    });
}

renderHighPriorityTasks(highPriorityTasks);

// Task 2: Dynamic Sizing and Positioning for Add Button
const addButton = document.querySelector('.add-button');

function updateAddButtonPosition() {
    const windowHeight = window.innerHeight;
    const addButtonHeight = addButton.offsetHeight;
    addButton.style.bottom = `${windowHeight * 0.1}px`; // Place the button 10% from the bottom of the window
}

updateAddButtonPosition(); // Initially position the add button

window.addEventListener('resize', updateAddButtonPosition); // Update button position on window resize

// Task 3: Toggle Navigation Menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navigationMenu = document.querySelector('.navigation-menu');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active'); // Toggle the active class for the close icon
    navigationMenu.classList.toggle('show');
});