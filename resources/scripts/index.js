let taskCount = 0;
let completedCount = 0;

let taskListArray = [];

// test dummy data, need to get this from input form
let taskObj = {
	id: 0,
	title: 'This is a task title.',
	desc: 'Task description Task description Task description Task description Task description Task description Task description',
	dateAdded: {
		d: '02',
		m: '02',
		y: '1985',
	},
	dateDue: {
		d: '02',
		m: '02',
		y: '1985',
	},
};

//console.info(`Tasks: ${taskCount} - Completed: ${completedCount}`);

const createBtn = document.getElementById('create-btn');

const taskContainer = document.getElementsByClassName('task-list-container')[0];
const completedTaskContainer = document.getElementsByClassName(
	'task-list-container'
)[1];

const cleanValue = input => {
	return new DOMParser().parseFromString(input, 'text/html').documentElement
		.textContent;
};

const createTask = () => {
	if (taskCount <= 0) {
		document.getElementsByClassName('task-list-placeholder')[0].style.display =
			'none';
	}

	const newTask = document.createElement('div');
	let content = `
    <!-- task element-->
      <div>
        <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${
							taskObj.id
						}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${
		taskObj.id
	}">
              ${cleanValue(taskObj.title)}
            </button>
          </h2>

          <div id="panelsStayOpen-collapse${
						taskObj.id
					}" class="accordion-collapse collapse">
            <div class="accordion-body flex-container">
              <p class="task-element">${cleanValue(taskObj.desc)}</p>
              <div class="task-element flex-container">
                <strong>Date Added: </strong> 
                <code>${taskObj.dateAdded.d}/${taskObj.dateAdded.m}/${
		taskObj.dateAdded.y
	}</code>
              </div>
              <div class="task-element flex-container">
                <strong>Date Due: </strong> 
                <code>${taskObj.dateDue.d}/${taskObj.dateDue.m}/${
		taskObj.dateDue.y
	}</code>
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

	taskListArray.push({
		id: taskListArray.length + 1,
		title: taskObj.title,
		desc: taskObj.desc,
		dateAdded: {
			d: taskObj.dateAdded.d,
			m: taskObj.dateAdded.m,
			y: taskObj.dateAdded.y,
		},
		dateDue: {
			d: taskObj.dateDue.d,
			m: taskObj.dateDue.m,
			y: taskObj.dateDue.y,
		},
	});

	taskCount++;

	console.log(`${taskObj.title}: `, taskListArray);
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
//             <strong>Date Added: </strong> <code>01/01/2025</code>
//           </div>
//           <div class="task-element flex-container">
//             <strong>Date Due: </strong> <code>01/01/2025</code>
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
