import { makeTodo, getTodos, addTodo, priorityOptions } from "./todo.js";

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

    let renderEditableSublist = function (todo) {
        let todoSublist = document.createElement("ul");
        todo.sublist.forEach(item => {
            let todoSublistElement = document.createElement("li");
            let todoSublistInput = document.createElement("input");
            todoSublistInput.type = "text";
            todoSublistInput.value = item.sublistTitle;
            todoSublistInput.addEventListener("change", () => {
                console.log(todoSublist.value);
                item.setTitle(todoSublistInput.value);
            });
            let todoSublistItemChecked = document.createElement("input");
            todoSublistItemChecked.type = "checkbox";
            if (item.isDone) {
                todoSublistItemChecked.checked = true;
            }
            todoSublistItemChecked.addEventListener("change", () => {
                item.toggleIsDone();
            });
            todoSublistElement.appendChild(todoSublistInput);
            todoSublistElement.appendChild(todoSublistItemChecked);
            todoSublist.appendChild(todoSublistElement);
        });
        return todoSublist;
    }

    let renderSublist = function (todo) {
        let todoSublist = document.createElement("ul");
        todo.sublist.forEach(item => {
            let todoSublistItem = document.createElement("li");
            let todoSublistTitle = document.createElement("h4");
            todoSublistTitle.innerText = item.sublistTitle;
            let todoSublistItemChecked = document.createElement("input");
            todoSublistItemChecked.type = "checkbox";
            if (item.isDone) {
                todoSublistItemChecked.checked = true;
            }
            todoSublistItemChecked.addEventListener("change", () => {
                item.toggleIsDone();
            });
            todoSublistItem.appendChild(todoSublistTitle);
            todoSublistItem.appendChild(todoSublistItemChecked);
            todoSublist.appendChild(todoSublistItem);
        });
        console.log(todoSublist);
        return todoSublist;
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

        todoSublist = renderEditableSublist(todoContext);
        todoSublistButton = renderSublistButton();


        todoButton = renderConfirmEditButton();
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

        todoSublist = renderSublist(todoContext);

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

        todoElement.appendChild(todoTitle);
        todoElement.appendChild(todoDesc);
        todoElement.appendChild(todoDueDate);
        todoElement.appendChild(todoPriority);
        todoElement.appendChild(todoChecked);
        todoElement.appendChild(todoSublist);
        todoElement.appendChild(todoButton);
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
            let todoSublistElement = document.createElement("li");
            let todoSublistInput = document.createElement("input");
            let sublistItem = todo.addToSublist("");
            todoSublistInput.type = "text";
            todoSublistInput.addEventListener("change", () => {
                sublistItem.setTitle(todoSublistInput.value);
            });

            let todoSublistItemChecked = document.createElement("input");
            todoSublistItemChecked.type = "checkbox";
            if (sublistItem.isDone) {
                todoSublistItemChecked.checked = true;
            }
            todoSublistItemChecked.addEventListener("change", () => {
                sublistItem.toggleIsDone();
            });
            todoSublistElement.appendChild(todoSublistInput);
            todoSublistElement.appendChild(todoSublistItemChecked);
            todoSublist.appendChild(todoSublistElement);
        });
        return todoSublistButton;
    }

    makeBasicTodoView();
    return todoElement;
}

export {makeTodoView};