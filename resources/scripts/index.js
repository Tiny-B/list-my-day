// arrays of the tasks for both lists to keep track
let taskListArray = [];
let completedListArray = [];

const createBtn = document.getElementById('create-btn');
let taskBtns = [];

const taskContainer = document.getElementsByClassName('task-list-container')[0];
const taskListPlaceholder = document.getElementsByClassName(
	'task-list-placeholder'
)[0];
const completedTaskContainer = document.getElementsByClassName(
	'task-list-container'
)[1];

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

//check form values for empty value on name as its only one required, date isn't required
const checkForm = () => {
	if (form[0].value == '') {
		return false;
	}

	return true;
};

const completeTask = i => {
	console.log(i, 'complete');
};

const editTask = i => {
	console.log(i, 'edit');
};

// deleting a task by creating a new array without the object we want to delete in it and setting it as the new list
const deleteTask = i => {
	const element = taskContainer.getElementsByClassName(`task${i}`)[0];
	element.remove();

	let newArray = [];
	// remove from array too
	const taskToDelete = taskListArray.filter(obj => obj.id == i).pop();

	for (let i = 0; i < taskListArray.length; i++) {
		if (taskListArray[i].id !== taskToDelete.id) {
			newArray.push(taskListArray[i]);
			console.log(`This is not the one`, taskListArray[i]);
		} else {
			console.log(`This is the one we want`, taskListArray[i]);
		}
	}
	taskListArray = newArray;
	console.log('taskListArray:', taskListArray);

	if (taskListArray.length == 0) {
		taskListPlaceholder.style.display = 'block';
	}
};

const restoreTask = i => {
	console.log(i, 'restore');
};

// this function will insert a new accordion element into our list using data from a form
const createTask = () => {
	// if the form is empty we cancel
	if (!checkForm()) {
		return;
	}

	// we remove the placeholder text that is only shown when there are no tasks in the list yet
	if (taskListArray.length <= 0) {
		taskListPlaceholder.style.display = 'none';
	}

	const taskID = taskListArray.length + 1;

	// assign the form values to the task object values
	let taskObj = {
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

	const newTask = document.createElement('div');
	// insert the data using a template literal
	// each task has an ID so we can find it and manipulate it
	let content = `
    <!-- task element-->
      <div class="task${taskID}">  
        <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${taskObj.id}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${taskObj.id}">
              ${taskObj.title}
            </button>
          </h2>

          <div id="panelsStayOpen-collapse${taskObj.id}" class="accordion-collapse collapse">
            <div class="accordion-body flex-container">
              <p class="task-element">${taskObj.desc}</p>
              <div class="task-element flex-container">
                <strong>Date Added: </strong> 
                <code>${taskObj.dateAdded.d}/${taskObj.dateAdded.m}/${taskObj.dateAdded.y}</code>
              </div>
              <div class="task-element flex-container">
                <strong>Date Due: </strong> 
                <code>${taskObj.dateDue.d}/${taskObj.dateDue.m}/${taskObj.dateDue.y}</code>
              </div>
              <div class="task-btns flex-container btn${taskObj.id}">
                <button id="complete-btn">Completed</button>
                <button id="edit-btn">Edit</button>
                <button id="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- --------- -->`;

	newTask.innerHTML = content;
	taskContainer.appendChild(newTask);

	const buttons = taskContainer.getElementsByClassName(`btn${taskObj.id}`)[0]
		.children;

	let btn = {
		id: taskID,
		complete: (buttons[0].onclick = function () {
			completeTask(btn.id);
		}),
		edit: (buttons[1].onclick = function () {
			editTask(btn.id);
		}),
		delete: (buttons[2].onclick = function () {
			deleteTask(btn.id);
		}),
	};

	taskBtns.push(btn);

	taskListArray.push(taskObj);
	clearForm();
};

createBtn.onclick = createTask;

//   <!-- task element completed -->
//     <div class="accordion" id="accordionPanelsStayOpenExample">
//     <div class="accordion-item">
//       <h2 class="accordion-header">
//         <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsec1" aria-expanded="true" aria-controls="panelsStayOpen-collapsec1">
//           Task Title
//         </button>
//       </h2>

//       <div id="panelsStayOpen-collapsec1" class="accordion-collapse collapse">
//         <div class="accordion-body flex-container">
//           <p class="task-element">Task description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, eaque..</p>
//           <div class="task-element flex-container">
//             <strong>Date Completed: </strong> <code>01/01/2025</code>
//           </div>
//           <div class="task-btns flex-container">
//             <button id="restore-btn">Restore</button>
//             <button id="delete-btn">Delete</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// <!-- --------- -->
