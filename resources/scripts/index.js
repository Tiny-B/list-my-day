// arrays of the tasks for both lists to keep track
let taskListArray = [];
let completedListArray = [];

const createBtn = document.getElementById('create-btn');

const taskContainer = document.getElementsByClassName('task-list-container')[0];
const completedTaskContainer = document.getElementsByClassName(
	'task-list-container'
)[1];

// prevents html injection
const cleanValue = input => {
	return new DOMParser().parseFromString(input, 'text/html').documentElement
		.textContent;
};

const form = document.getElementById('task-form');
console.log('form:', form);

// we should clear the forms values, ready for the next task to be added
const clearForm = () => {
	for (let i = 0; i < form.length; i++) {
		form[i].value = '';
	}

	form[2].value = '1';
	form[3].value = '1';
	form[4].value = '2025';
};

//check form values for empty values, date isn't required
const checkForm = () => {
	if (form[0].value == '' || form[1].value == '') {
		return false;
	}

	return true;
};

// this function will insert a new accordion element into our list using data from a form
const createTask = () => {
	// if the form is empty we cancel
	if (!checkForm()) {
		return;
	}

	// we remove the placeholder text that is only shown when there are no tasks in the list yet
	if (taskListArray.length <= 0) {
		document.getElementsByClassName('task-list-placeholder')[0].style.display =
			'none';
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
	let content = `
    <!-- task element-->
      <div>
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
              <div class="task-btns flex-container">
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
