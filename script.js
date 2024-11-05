"use strict";

////////////////////////////////////////////////////
////////////////  TASK LIST  //////////////////////
//////////////////////////////////////////////////

////////////////////////////////// GET ELEMENTS ///////////////////////////////////////

////dropdown nav elements
let toggler = document.getElementById("toggler");
let mobNavUl = document.getElementById("mob-nav-ul");
let mobNavContainer = document.querySelector(".mob-nav");
let mainContent = document.querySelector(".main-content");
let checked = false;

////buttons
let closeWinBtnEl = document.body.querySelector(".close-window-btn");
let modelAddTaskBtnEl = document.body.querySelector(".model-addtask-btn");
let mainAddTaskBtnEl = document.body.querySelector(".main-addtask-btn");
let completeBtnEl = document.body.querySelectorAll(".complete-btn");
let deleteBtnEl = document.body.querySelectorAll(".delete-btn");
let editBtnEl = document.body.querySelectorAll(".edit-btn");
let saveEditBtnEl = document.getElementById("save-btn");

//// main table
let taskTableEl = document.body.querySelector(".task-table");
let taskTextAreaEl = document.getElementById("taskTextArea");
let tableBodyEl = document.getElementById("table-body");
let tableRowEl = document.body.querySelectorAll(".table-row");
let taskTableDisplayEl = document.body.querySelector(".task-table-display");

////completed table
let completedTasksSectionsEl = document.getElementById("completed-tasks");
let completedTableBodyEl = document.getElementById("completed-table-body");

////other
let modelWindowEl = document.body.querySelector(".model-window");
let allTaskDataEl = document.body.querySelectorAll("tr td:nth-child(2)");
let mainEl = document.querySelector("main");
let taskHeaderEl = document.querySelector("h1");
let searchEl = document.body.querySelector(".search-bar");
let bodyEl = document.querySelector("body");

/////////////////////////////// MENU/STYLES //////////////////////////////////////////

////// DROPDOWN MENU (MOBILE)
toggler.addEventListener("click", function () {
  if (!checked) {
    mobNavUl.style.display = "block";
    checked = true;
  } else if (checked) {
    mobNavUl.style.display = "none";
    checked = false;
  }
});

////// TABLE DISPLAY
//// Hide task table / show completed table
bodyEl.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("completed-navlink")) {
    taskTableDisplayEl.style.display = "none";
    completedTasksSectionsEl.style.display = "block";
    taskHeaderEl.textContent = "Completed Task List";
    mobNavUl.style.display = "none";
    checked = false;
  }
});

//// Show task table / hide completed table
bodyEl.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("tasks-navlink")) {
    taskTableDisplayEl.style.display = "block";
    completedTasksSectionsEl.style.display = "none";
    taskHeaderEl.textContent = "Task List";
    mobNavUl.style.display = "none";
    checked = false;
  }
});

////////////////////////////// TASK FUNCTIONALITY ///////////////////////////////////

////// Open model window function
let openModelWindow = function () {
  modelWindowEl.style.display = "flex";
};

/////////////////////////////////////////////////////////////////////////////

////// Close model window function
let closeModelWindow = function () {
  modelWindowEl.style.display = "none";
};

/////////////////////////////////////////////////////////////////////////////

////// Get todays date function
let getTodaysDate = function () {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
};

/////////////////////////////////////////////////////////////////////////////

////// Validate form function
let validateForm = function (taskInputSt) {
  let cleanInput = taskInputSt.trim(); // Trim input

  if (cleanInput === "") {
    alert("Task input cannot be empty."); // Check empty spaces
    cleanInput = false;
    return null; // Stop processing
  }

  cleanInput = cleanInput.charAt(0).toUpperCase() + cleanInput.slice(1); // Capitalize the first letter

  if (cleanInput.length > 500) {
    // Limit chars
    alert("Task cannot exceed 500 characters.");
    cleanInput = false;
    return null; // Stop processing
  }

  // Check for valid content (special characters)
  if (/^[!@#$%^&*()_+=\-~`{}[\]:;"'<>,.?/|\\]*$/.test(cleanInput)) {
    alert("Task cannot contain only special characters.");
    cleanInput = false;
    return null; // Stop processing
  }

  // Check for valid content (numbers)
  if (/^[0-9]*$/.test(cleanInput)) {
    alert("Task cannot contain only numbers.");
    cleanInput = false;
    return null; // Stop processing
  }

  return cleanInput;
};

/////////////////////////////////////////////////////////////////////////////

////// Add task button event listener
mainAddTaskBtnEl.addEventListener("click", function () {
  openModelWindow();
});

/////////////////////////////////////////////////////////////////////////////

////// X button inside model event listener
closeWinBtnEl.addEventListener("click", function () {
  closeModelWindow();

  // Reset button visibility
  saveEditBtnEl.classList.add("hide-element");
  modelAddTaskBtnEl.classList.remove("hide-element");
});

/////////////////////////////////////////////////////////////////////////////

////// Add task button event listener (inside model)
modelAddTaskBtnEl.addEventListener("click", function () {
  let taskInputSt = taskTextAreaEl.value;
  let cleanTaskInputSt = validateForm(taskInputSt);

  if (!cleanTaskInputSt) {
    return null;
  } else {
    let createdDate = getTodaysDate();

    let newTableRow = `<tr class="table-row">
              <td>Incomplete</td>
              <td>${cleanTaskInputSt}</td>
              <td>${createdDate}</td>
              <td><button class="complete-btn">
                    <img
                      src="./assets/images/Check.svg"
                      alt="complete button icon"
                    />
                  </button>
                  <button class="edit-btn">
                    <img src="./assets/images/Edit.svg" alt="edit button icon" />
                  </button>
                  <button class="delete-btn">
                    <img src="./assets/images/Trash.svg" alt="delete button icon" />
                  </button>
                </td>
              </tr>
               </tr>`;

    tableBodyEl.insertAdjacentHTML("afterbegin", newTableRow);

    closeModelWindow();

    // Clear textarea
    taskTextAreaEl.value = "";
  }
});

/////////////////////////////////////////////////////////////////////////////

////// Complete task event listener using event delegation
tableBodyEl.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("complete-btn")) {
    let clickedBtnEl = event.target; // The button that was clicked
    let parentTrEl = clickedBtnEl.closest("tr"); // Find the closest <tr>
    // Get a specific <td> by its index (e.g., 1 for the second <td>)
    let taskTdEl = parentTrEl.children[1].textContent;

    let completedDate = getTodaysDate();

    let newCompletedTableRow = `<tr class="table-row">
    <td>Complete</td>
    <td>${taskTdEl}</td>
    <td>${completedDate}</td>
    <td><button class="delete-btn">
          <img src="./assets/images/Trash.svg" alt="delete button icon" />
        </button></td>
  </tr>`;

    completedTableBodyEl.insertAdjacentHTML("afterbegin", newCompletedTableRow);

    // Remove from task list
    parentTrEl.remove();
  }
});

/////////////////////////////////////////////////////////////////////////////

////// EDIT TASK

//// Edit button event listener
mainEl.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("edit-btn")) {
    let clickedBtnEl = event.target; // The button that was clicked
    let parentTrEl = clickedBtnEl.closest("tr"); // Find the closest <tr>
    parentTrEl.children[1].setAttribute("data-task-id", "row-edit");
    let taskTdEl = parentTrEl.children[1].textContent;

    saveEditBtnEl.classList.replace("hide-element", "save-btn");
    modelAddTaskBtnEl.classList.add("hide-element");

    console.log(modelAddTaskBtnEl);

    openModelWindow();

    taskTextAreaEl.value = taskTdEl;
  }
});

//// Save button event listener
saveEditBtnEl.addEventListener("click", function (event) {
  console.log(taskTextAreaEl.value);
  let taskInputSt = taskTextAreaEl.value;
  console.log(taskInputSt);

  let cleanTaskInputSt = validateForm(taskInputSt);

  if (!cleanTaskInputSt) {
    return null;
  } else {
    let newTableInputSt = `${cleanTaskInputSt}`;

    //display new edit content
    let editRow = document.querySelector("td[data-task-id='row-edit']");

    editRow.innerHTML = newTableInputSt;

    closeModelWindow();

    saveEditBtnEl.classList.add("hide-element");
    modelAddTaskBtnEl.classList.replace("hide-element", "model-addtask-btn");

    editRow.removeAttribute("data-task-id");

    // Clear textarea
    taskTextAreaEl.value = "";
  }
});

/////////////////////////////////////////////////////////////////////////////

////// DELETE TASK

//// Delete button event listener
mainEl.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("delete-btn")) {
    let clickedBtnEl = event.target; // The button that was clicked
    console.log(clickedBtnEl);
    let parentTrEl = clickedBtnEl.closest("tr"); // Find the closest <tr>
    // Remove from task list
    parentTrEl.remove();
  }
});

/////////////////////////////////////////////////////////////////////////////

////// SEARCH TASK

//// Search input event listener
searchEl.addEventListener("input", function (event) {
  let searchSt = event.target.value.toLowerCase().trim();

  // Get updated list of task elements each time the search input changes
  let allTaskDataEl = document.querySelectorAll("tr td:nth-child(2)");

  allTaskDataEl.forEach((taskEl) => {
    let taskText = taskEl.innerHTML.toLowerCase();
    let parentTrEl = taskEl.closest("tr");

    if (parentTrEl) {
      parentTrEl.style.display = taskText.includes(searchSt)
        ? "table-row"
        : "none";
    }
  });
});
