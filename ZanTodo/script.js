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
  