// Variables
const appID = 'app';
const projectDueDate = '2023-12-31';
const headingText = 'Project Deadline:';
const headingTextIcon = ' 🚀';

// Constants
const countdownDate = new Date(projectDueDate);

// DOM Elements
const appContainer = document.getElementById(appID);

// Functions

function calculateDaysLeft(countdownDate) {
  const now = new Date().getTime();
  const countdown = new Date(countdownDate).getTime();

  const difference = (countdown - now) / 1000;

  if (difference < 1) {
    return null;
  }

  const days = Math.floor(difference / (60 * 60 * 24));
  return days;
}

function initializeTaskList() {
  const taskListSection = document.getElementById('task-list');
  const addTaskForm = document.getElementById('add-task-form');

  if (!taskListSection || !addTaskForm) {
    console.error("Error: Could not find task list or add task form");
    return;
  }

  addTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskNameInput = document.getElementById('task-name');
    const taskDateInput = document.getElementById('task-date');
    const taskName = taskNameInput.value.trim();
    const taskDate = taskDateInput.value;

    if (taskName !== '' && taskDate !== '') {
      addTask(taskName, taskDate);
      taskNameInput.value = '';
      taskDateInput.value = '';
    }
  });

  function addTask(taskName, taskDate) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `<p>${taskName}</p><p>Date: ${taskDate}</p>`;
    taskListSection.appendChild(taskItem);
  }
}

// Inits & Event Listeners

document.addEventListener('DOMContentLoaded', function () {
  initializeTaskList();

  const calendarSection = document.getElementById('calendar');

  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,basicWeek,basicDay'
    },
    defaultDate: moment(),
    editable: true,
    events: [] 
  });
});