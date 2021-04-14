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
    document.getElementById("tasks-container").innerHTML += `<div class="task">
    <p>${taskCopy.position}<p>
    <input type="checkbox" id="${'checkboxTask' + taskCopy.position}" name="${'checkboxTask' + taskCopy.position}">
    <label for="${'task' + taskCopy.position}" id="${'labelTask' + taskCopy.position}">${taskCopy.text}</label>
</div>`;

console.log(taskArr);

    //checks checkboxes because everytime a task is added, all checkboxes get unchecked
    checksCheckBoxes();
};

function checkTasks(){

    //loop through checkboxes
    for(let i = 0; i < taskArr.length; i++)
    {

        //checks if checkbox is checked
        let isChecked = document.getElementById(`checkboxTask${taskArr[i].position}`).checked;
        //alert(taskArr[i].text)

        if(isChecked === true)
        {
            taskArr[i].finished = 1;
            completedTaskArr.push(taskArr[i]);
            document.getElementById('labelTask' + taskArr[i].position).innerHTML = `<s>${taskArr[i].text}</s>`;
        }
        else
        {
            taskArr[i].finished = 0; 
            document.getElementById('labelTask' + taskArr[i].position).innerHTML = `${taskArr[i].text}`;
        }

    };      

};

function checksCheckBoxes()
{
    for(let i = 0; i < taskArr.length; i++)
    {
        if(taskArr[i].finished === 1)
        {
            document.getElementById(`checkboxTask${taskArr[i].position}`).checked = true;
        }
    }

}


