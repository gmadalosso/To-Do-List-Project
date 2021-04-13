//Task Array
let taskArr = [];

//Task object
const task = {
    position: 0,
    text: '',
    finished: 0,
};


//BUTTON EVENTS

//Add Button
function addTask() {
    //reads values from inputs
    let inputText = document.getElementById("task-entry-box").value;
    let taskPosition = taskArr.length + 1;

    //assign task object the values
    task.position = taskPosition;
    task.text = inputText;
    task.finished = 0; //new task unfinished by default

    //includes new task in task array
    taskArr.push(task);

    //lists elements in task array
    var i;
    for (i = 0; i < taskArr.length; i++) {
        //console.log(taskArr[i]);
    }

    //Adds task to page
    document.getElementById("tasks-container").innerHTML += `<div class="task">
    <p>${task.position}<p>
    <input type="checkbox" id="task" name="${'task' + task.position}" value="completed">
    <label for="${'task' + task.position}">${task.text}</label>
</div>`;

};
