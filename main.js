let taskValInp = document.querySelector("#taskValInp");
let addBtn = document.querySelector("#addTask");
let showAllTasks = document.querySelector("#showAll");
let showNotDoneTasks = document.querySelector("#showNotDone");
let ulTasks = document.querySelector("#taskListUl");

let tasksTextArr = [];

function showTaskList() {
  ulTasks.innerHTML = "";

  let tasksStorage = localStorage.getItem("taskskey");
  if (tasksStorage) {
    tasksTextArr = JSON.parse(tasksStorage);
  } else {
    tasksTextArr = [];
  }

    tasksTextArr.forEach(({ taskInputText, isDone }) => renderTask(taskInputText, isDone));

}

showTaskList();


function saveInStorage() {
  localStorage.setItem("taskskey", JSON.stringify(tasksTextArr));
}

function renderTask(oneTaskTextval,isDone) {
  let taskLi = document.createElement("li");
  taskLi.classList.add("taskLi");

  let div = document.createElement("div");
  div.classList.add("taskLidiv");

  let inpCheckbox = document.createElement("input");
  inpCheckbox.type = "checkbox";
  inpCheckbox.addEventListener("click",()=> changeState(p.textContent,isDone,taskLi,p))

  let p = document.createElement("p");
  p.textContent = oneTaskTextval;
  p.classList.add("task-text")
  let checkboxTextdiv = document.createElement("div");

    let deleteTask = document.createElement("button");
    deleteTask.classList.add("deletebtn")
  deleteTask.textContent = "-";
  deleteTask.addEventListener("click", ()=> deleteTaskHandler(p.textContent, taskLi));

  div.append(checkboxTextdiv);
  checkboxTextdiv.append(inpCheckbox);
  checkboxTextdiv.append(p);
  checkboxTextdiv.classList.add("checkboxtext");

  div.append(deleteTask);
    
     if (!isDone) {
       taskLi.classList.remove("done");
     } else {
      
         taskLi.classList.add("done");
         inpCheckbox.checked = true;
     }
    
  taskLi.append(div);
  ulTasks.append(taskLi);
  taskValInp.value = "";

  return div;
}

  function deleteTaskHandler(textInInput, taskLi) {
    let indexoftextinarr = tasksTextArr.findIndex((task) => task.taskInputText === textInInput);

    if (indexoftextinarr != -1) {
      tasksTextArr.splice(indexoftextinarr, 1);
    }

    taskLi.remove();
    saveInStorage();
  }

  function changeState(textInInput, isDone, taskLi,p) {
    let indexoftextinarr = tasksTextArr.findIndex((task) => task.taskInputText === textInInput);
    if (indexoftextinarr !== -1) {
      let task = tasksTextArr[indexoftextinarr];
      if (!task.isDone) {
        task.isDone = true;
          taskLi.classList.add("done");
          p.classList.add("donetext");
      } else {
        task.isDone = false;
        taskLi.classList.remove("done");
        p.classList.remove("donetext");
      }

      saveInStorage();
    } else {console.error("Task not found in array");}
  }

taskValInp.addEventListener("focus", function () {
  taskValInp.value = "";
});

addBtn.addEventListener("click", createNewTask);
addBtn.classList.add("addTaskBtn")
taskValInp.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    createNewTask();
  }
});
 
showAllTasks.addEventListener("click", showTaskList);

showNotDoneTasks.addEventListener("click", showNotDoneTasksHandler);

function showNotDoneTasksHandler() {
    ulTasks.innerHTML = "";
    let notDone = tasksTextArr.filter((task) => task.isDone == false);
    notDone.forEach((x)=> renderTask(x.taskInputText,x.isDone))
}

function createNewTask() {
 let isDone = false;

    let taskInputText = taskValInp.value;
    if (!taskInputText) return;

    let indexoftextinarr = tasksTextArr.findIndex((task) => task.taskInputText === taskInputText);
    let confirmation;

  if (indexoftextinarr != -1) {
    confirmation = confirm(
      "Zadanie z taką nazwą już istnieje, czy nadal chcesz dodać?"
    );
    if (!confirmation) {
      taskValInp.value = "";
      return;
    }
  }
  renderTask(taskInputText, isDone);
  tasksTextArr.push({ taskInputText, isDone});
  saveInStorage(); 
}
