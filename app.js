//tasks
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

function addTask(task){
    const taskText = taskInput.value.trim();
    if(taskText !== ''){
        const task = { id: Dat.now(), text: taskText};
        addTaskElement(task);
        saveTask(task);
        taskInput.value = '';
    }
}

function addTaskElement(task){
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = '<span>${task.text}</span> <button class="edit" onClick="editTask${task.id}">Editar</button>    <button class="delete" onClick="deleteTask${task.id}">Borrar</button>';
    taskList.appendChild(li);
}

function deleteTask(id){
    const li = document.querySelector('li[data-id="${id}"]');
    li.remove();
    remoceTaskFromLocalStorage(id);
}

function edit(id){
    const li = document.querySelector('li[data-id="${id}"]');
    const taskText = li.querySelector('span').textContent;
    const newTaskText = prompt('Editar tarea:', taskText);
    if(newTaskText !== null && newTaskText.trim() !== ''){
        li.querySelector('span').textContent = newText;
        updateTaskInLocalStorage(id, newText);
    }
}

function saveTask(task){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(id){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(id, newText){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if(task.id === id){
            task.text = newText;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.addEventListener('load', () => { 
    const savedTasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(task => { addTaskElement(task)});
});
addTaskButton.addEventListener('click', addTask);
//timer
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const timer = document.getElementById('time');

let timeLeft = 1500;
let interval;

const updateTimer = () =>{
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

const startTimer = () => {
    if(interval) return;

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if(timeLeft === 0){
            clearInterval(interval);
            interval = null;

            alert('Se acabo el tiempo!');

            timeLeft = 1500;
            updateTimer();
        }
    }, 1000);
}

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
}

const resetTimer = () => {
    clearInterval(interval);
    interval = null;

    timeLeft = 1500;
    updateTimer();
}

start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
reset.addEventListener('click', resetTimer);

updateTimer();