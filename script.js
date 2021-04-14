//Task Array
let taskArr = [];

//Completed Task Array
completedTaskArr = [];

//Task object
const task = {
    position: 0,
    text: '',
    finished: 0,
};

//BUTTON EVENTS

//Add Button Function
function addTask() {

    //creates copy of task object
    let taskCopy = Object.assign({}, task);

    //reads values from inputs
    let inputText = document.getElementById("task-entry-box").value;
    let taskPosition = taskArr.length + 1;

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
    
    //Adds new task to page
    document.getElementById("tasks-container").innerHTML += `<div id="${'task' + taskCopy.position}" class="task">
    <p class="task-position">${taskCopy.position}<p>
    <input type="checkbox" id="${'checkboxTask' + taskCopy.position}" name="${'checkboxTask' + taskCopy.position}">
    <label for="${'task' + taskCopy.position}" id="${'labelTask' + taskCopy.position}">${taskCopy.text}</label>
    </div>`;

    //checks checkboxes because everytime a task is added, all checkboxes get unchecked
    checksCheckBoxes();

    //clears text input after adding task
    document.getElementById("task-entry-box").value = '';

    console.log(taskArr);

};

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

function checksCheckBoxes()
{
    //loops through task array and checks checkboxes if task if finished
    for(let i = 0; i < taskArr.length; i++)
    {
        if(taskArr[i].finished === 1)
        {
            document.getElementById(`checkboxTask${taskArr[i].position}`).checked = true;
        }
    }

}

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
       
    }

    //loop through task array to adjust position
    for(let i = 0; i < taskArr.length; i++)
    {
        taskArr[i].position = i + 1;
    };

    //rewrites list with new positions and only unfinished tasks
    rewritesList();
}

function rewritesList()
{
    //cleans list 
    document.getElementById("tasks-container").innerHTML = '';

    //rewrites list
    for(let i = 0; i < taskArr.length; i++)
    {
        document.getElementById("tasks-container").innerHTML += `<div id="${'task' + taskArr[i].position}" class="task">
        <p class="task-position">${taskArr[i].position}<p>
        <input type="checkbox" id="${'checkboxTask' + taskArr[i].position}" name="${'checkboxTask' + taskArr[i].position}">
        <label for="${'task' + taskArr[i].position}" id="${'labelTask' + taskArr[i].position}">${taskArr[i].text}</label>
        </div>`;
    }

    //rewrites "no tasks" message
    if(taskArr.length === 0)
    {
        document.getElementById("tasks-container").innerHTML = '<div class="task"><p>No tasks! Yay!</p></div>';
    }
}

function clearTasks()
{
    //clear all tasks from task array
    taskArr = [];

    //shows "no task" message again
    document.getElementById("tasks-container").innerHTML = '<div class="task"><p>No tasks! Yay!</p></div>';

}


