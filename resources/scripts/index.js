let taskListArray = [];
let completedListArray = [];

const createBtn = document.getElementById('create-btn');

const taskContainer = document.getElementsByClassName('task-list-container')[0];
const taskListPlaceholder = document.getElementsByClassName(
	'task-list-placeholder'
)[0];

const completedTaskContainer = document.getElementsByClassName(
	'task-list-container'
)[1];
const completedListPlaceholder = document.getElementsByClassName(
	'completed-list-placeholder'
)[0];

const confirmEditBtn = document.getElementById('edit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

let createTaskModalElements = document.getElementsByClassName('create');
let editTaskModalElements = document.getElementsByClassName('edit');

// prevents html injection
const cleanValue = input => {
	return new DOMParser().parseFromString(input, 'text/html').documentElement
		.textContent;
};

const form = document.getElementById('task-form');

// we should clear the forms values, ready for the next task to be added
const clearForm = () => {
	for (let i = 0; i < form.length; i++) {
		form[i].value = '';
	}

	form[2].value = '1';
	form[3].value = '1';
	form[4].value = '2025';
};
clearForm();

//check form values for empty value on name as its only one required, desc & date isn't required
const checkForm = () => {
	if (form[0].value == '') {
		return false;
	}

	return true;
};

// cherry pick the elements to edit
const performEdit = (form, id) => {
	const taskToEdit = taskContainer.getElementsByClassName(`task${id}`)[0];

	let title = taskToEdit.getElementsByClassName('task-title')[0];
	if (form[0].value !== '') {
		title.innerText = cleanValue(form[0].value);
	}

	let desc = taskToEdit.getElementsByClassName('task-desc')[0];
	if (form[1].value !== '') {
		desc.innerText = cleanValue(form[1].value);
	}

	let dateDue = taskToEdit.getElementsByClassName('task-date-due')[0];
	dateDue.innerText = `${form[2].value}/${form[3].value}/${form[4].value}`;
};

const editTask = i => {
	// store the id of current task to use in the onclick function
	const id = i;

	// Add the current tasks details to the form for easier editing
	const currentTask = taskListArray.filter(task => task.id == id).pop();
	form[0].value = currentTask.title;
	form[1].value = currentTask.desc;
	form[2].value = currentTask.dateDue.d;
	form[3].value = currentTask.dateDue.m;
	form[4].value = currentTask.dateDue.y;

	// Switch the elements from create to edit since using the same modal for both
	for (let i = 0; i < createTaskModalElements.length; i++) {
		createTaskModalElements[i].style.display = 'none';
		editTaskModalElements[i].style.display = 'block';
	}

	confirmEditBtn.onclick = function (i) {
		for (let i = 0; i < createTaskModalElements.length; i++) {
			createTaskModalElements[i].style.display = 'block';
			editTaskModalElements[i].style.display = 'none';
		}

		performEdit(form, id);

		clearForm();
	};

	// switch elements back on cancel too
	cancelEditBtn.onclick = function (i) {
		for (let i = 0; i < createTaskModalElements.length; i++) {
			createTaskModalElements[i].style.display = 'block';
			editTaskModalElements[i].style.display = 'none';
		}
	};
};

// deleting a task by creating a new array without the object we want to delete in it and setting it as the new list
const deleteTask = (i, isCompleted = false) => {
	if (isCompleted) {
		const element = completedTaskContainer.getElementsByClassName(
			`task${i}`
		)[0];
		element.remove();

		// remove from array too
		completedListArray = removeTaskFromArray(
			completedListArray,
			isCompleted,
			i
		);
	} else {
		const element = taskContainer.getElementsByClassName(`task${i}`)[0];
		element.remove();

		// remove from array too
		taskListArray = removeTaskFromArray(taskListArray, isCompleted, i);
	}
};

const removeTaskFromArray = (list, isCompleted, i) => {
	let newArray = [];
	const taskToDelete = list.filter(obj => obj.id == i).pop();

	for (let i = 0; i < list.length; i++) {
		if (list[i].id !== taskToDelete.id) {
			newArray.push(list[i]);
		}
	}

	// show placeholder text when there are no tasks
	if (isCompleted) {
		if (newArray.length == 0) {
			completedListPlaceholder.style.display = 'block';
		}
	} else {
		if (newArray.length == 0) {
			taskListPlaceholder.style.display = 'block';
		}
	}

	return newArray;
};

const completeTask = i => {
	if (completedListArray.length == 0) {
		taskListPlaceholder.style.display = 'none';
	}

	const taskData = taskListArray.filter(task => task.id === i).pop();
	taskListArray = removeTaskFromArray(taskListArray, false, taskData.id);

	const completedTask = taskContainer.getElementsByClassName(`task${i}`)[0];
	completedTask.remove();

	const container = completedTaskContainer;

	const newTask = document.createElement('div');
	newTask.className = `task${taskData.id}`;

	let content = `
    <div class="accordion" id="accordionPanelsStayOpenExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${taskData.id}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${taskData.id}">
          ${taskData.title}
        </button>
      </h2>

      <div id="panelsStayOpen-collapse${taskData.id}" class="accordion-collapse collapse">
        <div class="accordion-body flex-container">
          <p class="task-element">${taskData.desc}</p>
          <div class="task-element flex-container">
            <strong>Date Completed: </strong> <code>${taskData.dateAdded.d}/${taskData.dateAdded.m}/${taskData.dateAdded.y}</code>
          </div>
          <div class="task-btns flex-container btn${taskData.id}">
            <button id="restore-btn">Restore</button>
            <button id="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

	newTask.innerHTML = content;
	container.appendChild(newTask);

	const buttons = container.getElementsByClassName(`btn${taskData.id}`)[0]
		.children;

	buttons[0].onclick = function () {
		restoreTask(taskData.id);
	};

	buttons[1].onclick = function () {
		deleteTask(taskData.id, true);
	};

	if (completedListArray.length == 0) {
		completedListPlaceholder.style.display = 'none';
	}

	completedListArray.push(taskData);
};

const restoreTask = i => {
	const taskToRestore = completedListArray.filter(task => task.id === i).pop();

	const restoredTask = completedTaskContainer.getElementsByClassName(
		`task${i}`
	)[0];
	restoredTask.remove();
	completedListArray = removeTaskFromArray(
		completedListArray,
		true,
		taskToRestore.id
	);

	createTask(taskToRestore);
};

// this function will insert a new accordion element into our list using data from a form
const createTask = (task = {}) => {
	// restoreTask also uses this function so we check if our param has a key, if not it's a new task to create
	const isNewTask = Object.hasOwn(task, 'id') ? false : true;

	// if the form is empty we cancel
	if (isNewTask) {
		if (!checkForm()) {
			return;
		}
	}

	// we remove the placeholder text that is only shown when there are no tasks in the list yet
	if (taskListArray.length == 0) {
		taskListPlaceholder.style.display = 'none';
	}

	// give each task a random unique ID
	let taskID = 0;
	if (isNewTask) {
		taskID = Math.floor(Math.random() * 12053 + Math.random() * 6282);
	} else {
		taskID = task.id;
	}

	// assign the form values to the task object values
	let taskObj = {};
	if (isNewTask) {
		taskObj = {
			id: taskID,
			// trim values to keep a consistent and clean design
			title: cleanValue(form[0].value.trim()),
			desc: cleanValue(form[1].value.trim()),
			dateAdded: {
				d: '1', // use device date
				m: '2',
				y: '1985',
			},
			dateDue: {
				d: form[2].value,
				m: form[3].value,
				y: form[4].value,
			},
		};
	} else {
		taskObj = task;
	}

	const newTask = document.createElement('div');
	newTask.className = 'task-parent';
	// insert the data using a template literal
	// each task has an ID so we can find it and manipulate it
	let content = `
      <div class="task${taskID}">  
        <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed task-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${taskObj.id}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${taskObj.id}">
              ${taskObj.title}
            </button>
          </h2>

          <div id="panelsStayOpen-collapse${taskObj.id}" class="accordion-collapse collapse">
            <div class="accordion-body flex-container">
              <p class="task-element task-desc">${taskObj.desc}</p>
              <div class="task-element flex-container">
                <strong>Date Added: </strong> 
                <code class="task-date-add">${taskObj.dateAdded.d}/${taskObj.dateAdded.m}/${taskObj.dateAdded.y}</code>
              </div>
              <div class="task-element flex-container">
                <strong>Date Due: </strong> 
                <code class="task-date-due">${taskObj.dateDue.d}/${taskObj.dateDue.m}/${taskObj.dateDue.y}</code>
              </div>
              <div class="task-btns flex-container btn${taskObj.id}">
                <button id="complete-btn">Completed</button>
                <button class="open-create-dialog" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="edit-btn">Edit</button>
                <button id="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

	newTask.innerHTML = content;
	taskContainer.appendChild(newTask);

	const buttons = taskContainer.getElementsByClassName(`btn${taskObj.id}`)[0]
		.children;

	buttons[0].onclick = function () {
		completeTask(taskObj.id);
	};

	buttons[1].onclick = function () {
		editTask(taskObj.id);
	};

	buttons[2].onclick = function () {
		deleteTask(taskObj.id);
	};

	taskListArray.push(taskObj);
	clearForm();
};

createBtn.onclick = createTask;


