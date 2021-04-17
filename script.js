/*--- ARRAYS AND OBJECTS ---*/

//Task Array
let taskArr = [];

//Task object
const task = {
    position: 0,
    text: '',
    finished: 0,
};

/*--- FUNCTIONS ---*/

//Add Button Function
//Adds a new task to the task array and list on the page
function addTask() {

    //creates copy of task object
    let taskCopy = Object.assign({}, task);

    //reads values from inputs
    let inputText = document.getElementById("task-entry-box").value;
    let taskPosition = taskArr.length + 1;
    let i = taskArr.length;

    if(inputText === '')
    {
        alert('Please, write something!'); //shows message if text input is empty
    }
    else 
    {
        //assign task object the values
        taskCopy.position = taskPosition;
        taskCopy.text = inputText;
        taskCopy.finished = 0; //new task unfinished by default

        //includes new task in task array
        taskArr.push(taskCopy);

        //Deletes 'no tasks' message when adding first task
        if(taskCopy.position === 1)
        {
            document.getElementById("tasks-container").innerHTML = '';
        };
        
        //adds task to page
        addTaskToPage(i);

        //checks checkboxes because everytime a task is added, all checkboxes get unchecked
        checksCheckBoxes();

        //clears text input after adding task
        document.getElementById("task-entry-box").value = '';
    };


};

//changes style of task once its checkbox is check or unchecked
function checkTasks(){

    //loop through checkboxes
    for(let i = 0; i < taskArr.length; i++)
    {

        //checks if checkbox is checked
        let isChecked = document.getElementById(`checkboxTask${taskArr[i].position}`).checked;

        if(isChecked === true) 
        {
            taskArr[i].finished = 1; //changes finished field in task object
            document.getElementById('labelTask' + taskArr[i].position).innerHTML = `<s>${taskArr[i].text}</s>`; //strikes task text
            document.getElementById('task' + taskArr[i].position).getElementsByClassName("task-position")[0].style.backgroundColor = "#ACE2C6";
            document.getElementById('labelTask' + taskArr[i].position).style.color = "#B9B9B9";
        }
        else //if checked = false, removes strike and changes task to unfinished
        {
            taskArr[i].finished = 0; 
            document.getElementById('labelTask' + taskArr[i].position).innerHTML = `${taskArr[i].text}`;
            document.getElementById('task' + taskArr[i].position).getElementsByClassName("task-position")[0].style.backgroundColor = "#EEE2C7";
            document.getElementById('labelTask' + taskArr[i].position).style.color = "#493A26";
        }

    };      

};

//rechecks checkboxes based on finished property of task object in the task array
function checksCheckBoxes()
{
    //loops through task array and checks checkboxes if task if finished
    for(let i = 0; i < taskArr.length; i++)
    {
        if(taskArr[i].finished === 1)
        {
            document.getElementById(`checkboxTask${taskArr[i].position}`).checked = true;
        };
    };

};

//deletes all tasks marked as finished
function deleteTasks(){

    //loop through task array to remove finished arrays
    for(let i = 0; i < taskArr.length; i++)
    {
        //checks if task is finished
        let isFinished = taskArr[i].finished;

        //removes task from task array
        if(isFinished === 1)
        {
            taskArr.splice(i, 1);
            i--;
        };
       
    };

    //loop through task array to adjust position
    for(let i = 0; i < taskArr.length; i++)
    {
        taskArr[i].position = i + 1;
    };

    //rewrites list with new positions and only unfinished tasks
    rewritesList();
};

//rewrites entire task list using task array
function rewritesList()
{
    //cleans list 
    document.getElementById("tasks-container").innerHTML = '';

    //rewrites list
    for(let i = 0; i < taskArr.length; i++)
    {
        addTaskToPage(i);
    };

    //rewrites "no tasks" message
    if(taskArr.length === 0)
    {
        document.getElementById("tasks-container").innerHTML = '<div class="task"><p>No tasks! Yay!</p></div>';
    };
};

//clear task array and task list on the page
function clearTasks()
{
    //clear all tasks from task array
    taskArr = [];

    //shows "no task" message again
    document.getElementById("tasks-container").innerHTML = '<div class="task"><p>No tasks! Yay!</p></div>';

};

//adds necessary HTML code to the page to show new task on the list (task position = i)
function addTaskToPage(i)
{
    document.getElementById("tasks-container").innerHTML += `<div id="${'task' + taskArr[i].position}" class="task" onmouseenter="showOptions(event)" onmouseleave="hideOptions(event)">
    <p class="task-position">${taskArr[i].position}<p>
    <input type="checkbox" id="${'checkboxTask' + taskArr[i].position}" name="${'checkboxTask' + taskArr[i].position}">
    <label for="${'task' + taskArr[i].position}" id="${'labelTask' + taskArr[i].position}">${taskArr[i].text}</label>
    <button id="${'up-button' + taskArr[i].position}" class="up-button button-style" onclick="upTask(event)">Up</button>
    <button id="${'down-button' + taskArr[i].position}" class="down-button button-style" onclick="downTask(event)">Down</button>
    <button id="${'edit-button' + taskArr[i].position}" class="edit-button button-style" onclick="editTask(event)">Edit</button>
    <button id="${'delete-task-button' + taskArr[i].position}" class="delete-task-button button-style" onclick="deleteTask(event)">Delete</button>
    </div>`;
};

//show options for task when hover over it
function showOptions(event){

    //doesn't show "up" options if it's the first task on the list
    if(event.target.id != 'task1')
    {
        document.getElementById(event.target.id).getElementsByClassName("up-button")[0].style.display = "inline-block";
    };

    //doesn't show "down" options if it's the last task on the list
    if(event.target.id != 'task' + (taskArr.length))
    {
        document.getElementById(event.target.id).getElementsByClassName("down-button")[0].style.display = "inline-block";
    };
    
    document.getElementById(event.target.id).getElementsByClassName("edit-button")[0].style.display = "inline-block";
    document.getElementById(event.target.id).getElementsByClassName("delete-task-button")[0].style.display = "inline-block";
};

//hide options for task when mouse moves away
function hideOptions(event)
{
    document.getElementById(event.target.id).getElementsByClassName("up-button")[0].style.display = "none";
    document.getElementById(event.target.id).getElementsByClassName("down-button")[0].style.display = "none";
    document.getElementById(event.target.id).getElementsByClassName("edit-button")[0].style.display = "none";
    document.getElementById(event.target.id).getElementsByClassName("delete-task-button")[0].style.display = "none";
};

//deletes task when delete button clicked
function deleteTask(event)
{
    //gets button id
    let id = event.target.id;

    //gets task position from button id
    let taskPosition = id.substr(id.length - 1); 

    //removes task from task array
    taskArr.splice(taskPosition - 1, 1); 

    //loop through task array to adjust position
    for(let i = 0; i < taskArr.length; i++)
    {
        taskArr[i].position = i + 1;
    };

    //rewrites task list
    rewritesList();
}

//moves task one position up in the task list
function upTask(event){

    //gets button id
    let id = event.target.id;

    //gets task position from button id
    let taskPosition = id.substr(id.length - 1); 

    //switches positions of current task and task above
    taskAbove = taskArr[taskPosition-2];
    taskCurr = taskArr[taskPosition-1];

    taskArr[taskPosition-2] = taskCurr;
    taskArr[taskPosition-1] = taskAbove;

    //loop through task array to adjust position
    for(let i = 0; i < taskArr.length; i++)
    {
        taskArr[i].position = i + 1;
    };

    //rewrites task list
    rewritesList();

    //rechecks boxes
    checksCheckBoxes();
}

//moves task one position up in the task list
function downTask(event){

    //gets button id
    let id = event.target.id;

    //gets task position from button id
    let taskPosition = id.substr(id.length - 1); 

    //switches positions of current task and task below
    taskBelow = taskArr[taskPosition];
    taskCurr = taskArr[taskPosition-1];

    taskArr[taskPosition] = taskCurr;
    taskArr[taskPosition-1] = taskBelow;

    //loop through task array to adjust position
    for(let i = 0; i < taskArr.length; i++)
    {
        taskArr[i].position = i + 1;
    };

    //rewrites task list
    rewritesList();

    //rechecks boxes
    checksCheckBoxes();
}



