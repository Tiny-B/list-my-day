let taskCount = 0;
let completedCount = 0;

let taskListArray = [];

const createBtn = document.getElementById('create-btn');

const taskContainer = document.getElementsByClassName('task-list-container')[0];
const completedTaskContainer = document.getElementsByClassName(
	'task-list-container'
)[1];

const cleanValue = input => {
	return new DOMParser().parseFromString(input, 'text/html').documentElement
		.textContent;
};

const form = document.getElementById('task-form');
console.log(form);

const createTask = () => {
	if (taskCount <= 0) {
		document.getElementsByClassName('task-list-placeholder')[0].style.display =
			'none';
	}

	const taskID = taskListArray.length + 1;

	let taskObj = {
		id: taskID,
		title: cleanValue(form[0].value),
		desc: cleanValue(form[1].value),
		dateAdded: {
			d: '01',
			m: '02',
			y: '1985',
		},
		dateDue: {
			d: form[2].value,
			m: form[3].value,
			y: form[4].value,
		},
	};

	const newTask = document.createElement('div');
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
