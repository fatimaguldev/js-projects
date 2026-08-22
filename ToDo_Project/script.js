const inputBox = document.getElementById("input-box");
const deadlineInput = document.getElementById("deadline");
const listContainer = document.getElementById("list-container");

// ADD TASK
function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You must write something!");

    return;
  }

  // Create LI
  let li = document.createElement("li");

  // Create task content
  let taskContent = document.createElement("div");

  taskContent.className = "task-content";

  // Create task text
  let taskText = document.createElement("div");

  taskText.className = "task-text";

  taskText.innerText = inputBox.value;

  // Create deadline
  let deadline = document.createElement("small");

  deadline.className = "deadline";

  if (deadlineInput.value !== "") {
    let deadlineDate = new Date(deadlineInput.value);

    deadline.innerText = getRemainingTime(deadlineDate);

    deadline.dataset.deadline = deadlineDate.getTime();
  } else {
    deadline.innerText = "No deadline";
  }

  // Put text + deadline inside task-content
  taskContent.appendChild(taskText);

  taskContent.appendChild(deadline);

  // Add content to LI
  li.appendChild(taskContent);

  // Delete button
  let span = document.createElement("span");

  span.innerHTML = "\u00d7";

  li.appendChild(span);

  // Add task to list
  listContainer.appendChild(li);

  // Clear inputs
  inputBox.value = "";

  deadlineInput.value = "";

  // Save
  saveData();

  // Sort tasks
  sortTasks();
}

// CLICK EVENTS

listContainer.addEventListener(
  "click",
  function (e) {
    // COMPLETING TASK

    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");

      sortTasks();

      saveData();
    }

    // DELETE TASK
    else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();

      saveData();
    }
  },
  false,
);

// SAVE DATA

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// SHOW SAVED TASKS

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";

  sortTasks();
}

// SORT TASKS

function sortTasks() {
  let tasks = Array.from(listContainer.children);

  tasks.sort(function (a, b) {
    let aCompleted = a.classList.contains("checked");

    let bCompleted = b.classList.contains("checked");

    // Unfinished tasks first
    if (aCompleted && !bCompleted) {
      return 1;
    }

    if (!aCompleted && bCompleted) {
      return -1;
    }

    return 0;
  });

  tasks.forEach(function (task) {
    listContainer.appendChild(task);
  });
}

// REMAINING TIME

function getRemainingTime(deadline) {
  let now = new Date();

  let difference = deadline.getTime() - now.getTime();

  if (difference <= 0) {
    return "Deadline expired";
  }

  let totalSeconds = Math.floor(difference / 1000);

  let days = Math.floor(totalSeconds / (60 * 60 * 24));

  let hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));

  let minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

  if (days > 0) {
    return `${days} day(s) ${hours} hour(s) left`;
  }

  if (hours > 0) {
    return `${hours} hour(s) ${minutes} minute(s) left`;
  }

  return `${minutes} minute(s) left`;
}

// UPDATE DEADLINES

function updateDeadlines() {
  let deadlines = document.querySelectorAll(".deadline");

  deadlines.forEach(function (deadline) {
    let timestamp = deadline.dataset.deadline;

    if (!timestamp) {
      return;
    }

    let deadlineDate = new Date(Number(timestamp));

    let remaining = getRemainingTime(deadlineDate);

    deadline.innerText = remaining;

    if (remaining === "Deadline expired") {
      deadline.classList.add("expired");
    } else {
      deadline.classList.remove("expired");
    }
  });
}

// UPDATE EVERY MINUTE

setInterval(updateDeadlines, 60000);

// LOAD DATA

showTask();

// UPDATE IMMEDIATELY

updateDeadlines();
