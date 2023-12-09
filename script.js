//
//  JS File
//  YOU CAN REMOVE ALL OF THIS CODE AND START FRESH
//

//
// Variables
//

// Constants
const appID = "app";
const headingText = "TASK HERO.";
const headingTextIcon = "🚀";
const projectDueDate = "8 December 2023 11:59";

// Variables
let countdownDate = new Date(projectDueDate);

// DOM Elements
let appContainer = document.getElementById(appID);

//
// Functions
//

function calculateDaysLeft(countdownDate) {
  const now = new Date().getTime();
  const countdown = new Date(countdownDate).getTime();

  console.log(countdown);

  const difference = (countdown - now) / 1000;


  // Countdown passed already
  if (difference < 1) {
    return null;
  }


  const days = Math.floor(difference / (60 * 60 * 24));

  return days;
}

// Add a heading to the app container
function inititialise() {
  // If anything is wrong with the app container then end
  if (!appContainer) {
    console.error("Error: Could not find app contianer");
    return;
  }

  // Create an h1 and add it to our app
  const h1 = document.createElement("h1");
  const daysLeft = calculateDaysLeft(countdownDate);
  let headingTextCalculated = headingText;

  if (daysLeft > 1) {
    headingTextCalculated = headingTextCalculated.concat(
      " In ",
      daysLeft.toString(),
      " days "
    );
  }else if (daysLeft === 1) {
    headingTextCalculated = headingTextCalculated.concat(
      " Tomorrow"
    );
  }

  h1.textContent = headingTextCalculated.concat(headingTextIcon);
  appContainer.appendChild(h1);

  // Init complete
  console.log("App successfully initialised");
}

//
// Inits & Event Listeners
//

inititialise();
document.addEventListener('DOMContentLoaded', function() {
  const taskListSection = document.getElementById('task-list');
  const addTaskForm = document.getElementById('add-task-form');
  const calendarSection = document.getElementById('calendar');

  addTaskForm.addEventListener('submit', function(event) {
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

  // Initialize FullCalendar
  $('#calendar').fullCalendar({
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
      },
      defaultDate: moment(),
      editable: true,
      events: [] // You can populate events dynamically
  });
});
