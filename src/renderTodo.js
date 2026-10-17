import { makeTodo, getTodos, addTodo, priorityOptions, removeTodo} from "./todo.js";
import { makeChecklistRendering } from "./renderChecklist.js";

let makeTodoView = function (todo, parent) {
    let parentElemeent = parent;
    let todoContext = todo;
    let todoTitle;
    let todoDesc;
    let todoDueDate;
    let todoPriority;
    let todoSublist;
    let todoChecked;
    let todoElement;
    let todoButton;
    let todoSublistButton;
    let removeButton;
    let checkListRenderer = makeChecklistRendering(todoContext);

    let refresh = function (oldElement) {    
        todoElement.replaceChildren();
        todoElement.appendChild(todoTitle);
        todoElement.appendChild(todoDesc);
        todoElement.appendChild(todoDueDate);
        todoElement.appendChild(todoPriority);
        todoElement.appendChild(todoChecked);
        todoElement.appendChild(todoSublist);
        if(todoSublistButton !== null){
            todoElement.appendChild(todoSublistButton);
        }
        todoElement.appendChild(todoButton);
        todoElement.appendChild(removeButton);
        parentElemeent.replaceChild(todoElement, oldElement);
    }

    let renderPriorityInput = function () {
        let todoPriorityInput = document.createElement("select")
        todoPriorityInput.name = "priority"

        priorityOptions.forEach(option => {
            let opitonInput = document.createElement("option");
            opitonInput.value = option;
            opitonInput.innerText = option;
            todoPriorityInput.appendChild(opitonInput);
            if(todoContext.priority === option){
                opitonInput.selected = true;
            }
        });
        return todoPriorityInput;
    }

    let renderSublist = function (isEditable) {
        return checkListRenderer.render(isEditable);
    }

    let makeEditableTodoView = function () {
        todoElement = document.createElement("form");

        todoElement.method = "POST";
        todoElement.action = "/";
        todoTitle = document.createElement("input");
        todoTitle.type = "text";
        todoTitle.value = todoContext.title;

        todoDesc = document.createElement("input");
        todoDesc.type = "text";
        todoDesc.value = todoContext.description;

        todoDueDate = document.createElement("input");
        todoDueDate.type = "date";
        todoDueDate.value = todoContext.dueDate;


        todoPriority = renderPriorityInput();

        todoChecked = document.createElement("input");
        todoChecked.type = "checkbox";
        todoChecked.checked = todoContext.isDone;
  
        todoChecked.addEventListener("change", () => {
            todoContext.toggleIsDone();
        });

        todoSublist = renderSublist(true);
        todoSublistButton = renderSublistButton();


        todoButton = renderConfirmEditButton();
        renderRemoveButton();
    }

    let makeBasicTodoView = function () {
        todoElement = document.createElement("div");

        todoTitle = document.createElement("h2");
        todoTitle.innerText = todoContext.title;

        todoDesc = document.createElement("p");
        todoDesc.innerText = todoContext.description;

        todoDueDate = document.createElement("p");
        todoDueDate.innerText = todoContext.dueDate;

        todoPriority = document.createElement("p");
        todoPriority.innerText = todoContext.priority;

        todoChecked = document.createElement("input");
        todoChecked.type = "checkbox";
        todoChecked.checked = todoContext.isDone;
        todoChecked.addEventListener("change", () => {
            todoContext.toggleIsDone();
        });

        todoSublist = renderSublist(false);

        todoButton = document.createElement("button");
        todoButton.type = "button";
        todoButton.innerText = "Edit";
        todoButton.addEventListener("click", () => {
            let oldElement = todoElement;
            makeEditableTodoView();
            refresh(oldElement);
            return;

        });
        todoSublistButton = null;
        renderRemoveButton();
        todoElement.replaceChildren();
        todoElement.appendChild(todoTitle);
        todoElement.appendChild(todoDesc);
        todoElement.appendChild(todoDueDate);
        todoElement.appendChild(todoPriority);
        todoElement.appendChild(todoChecked);
        todoElement.appendChild(todoSublist);
        if(todoSublistButton !== null){
            todoElement.appendChild(todoSublistButton);
        }
        todoElement.appendChild(todoButton);
        todoElement.appendChild(removeButton);
    }

    let renderRemoveButton = function(){
        removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.innerText = "Remove";
        removeButton.addEventListener("click", () => {
            removeTodo(todoContext);
            todoElement.remove();
            parentElemeent.remove();
        });
    }

    let renderConfirmEditButton = function () {
        let confirmEditButton = document.createElement("button");
        confirmEditButton.type = "button";
        confirmEditButton.innerText = "Confirm";
        confirmEditButton.addEventListener("click", () => {
            todoContext.title = todoTitle.value;
            todoContext.description = todoDesc.value;
            todoContext.dueDate = todoDueDate.value;
            todoContext.priority = todoPriority.value;
            let oldElement = todoElement;
            makeBasicTodoView();
            refresh(oldElement);
            return;
        });
        return confirmEditButton;
    }

    let renderSublistButton = function () {
        let todoSublistButton = document.createElement("button");
        todoSublistButton.type = "button";
        todoSublistButton.innerText = "Add Sublist Item";
        todoSublistButton.addEventListener("click", () => {
            todoContext.addToSublist("");
            todoSublist = renderSublist(true);
        });
        return todoSublistButton;
    }

    makeBasicTodoView();
    return todoElement;
}

export {makeTodoView};