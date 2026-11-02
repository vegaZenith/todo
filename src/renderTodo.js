import { makeTodo, getTodos, addTodo, priorityOptions, removeTodo, modifyTodo} from "./todo.js";
import { makeChecklistRendering } from "./renderChecklist.js";

let makeTodoView = function (todo, parent) {
    let parentElement = parent;
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
        if(parentElement.contains(oldElement)){
            parentElement.replaceChild(todoElement, oldElement);
        } else {
            parentElement.appendChild(todoElement);
        }
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

    let renderMainElement = function(isEditable){
        if(isEditable){
            todoElement = document.createElement("form");
            todoElement.method = "POST";
            todoElement.action = "/";
        } else {
            todoElement = document.createElement("div");
        }
    }

    let renderTitle = function(isEditable){
        if(isEditable){
            todoTitle = document.createElement("input");
            todoTitle.type = "text";
            todoTitle.value = todoContext.title;
        } else {
            todoTitle = document.createElement("h2");
            todoTitle.innerText = todoContext.title;
        }
    }

    let rednerDescription = function(isEditable){
        if(isEditable){
            todoDesc = document.createElement("input");
            todoDesc.type = "text";
            todoDesc.value = todoContext.description;
        } else {
            todoDesc = document.createElement("p");
            todoDesc.innerText = todoContext.description;
        }
    }

    let renderDueDate = function(isEditable){
        if(isEditable){
            todoDueDate = document.createElement("input");
            todoDueDate.type = "date";
            todoDueDate.value = todoContext.dueDate;
        } else {
            todoDueDate = document.createElement("p");
            todoDueDate.innerText = todoContext.dueDate;
        }
    }

    let renderCheckbox = function(){
        todoChecked = document.createElement("input");
        todoChecked.type = "checkbox";
        todoChecked.checked = todoContext.isDone;
  
        todoChecked.addEventListener("change", () => {
            todoContext.toggleIsDone();
            modifyTodo(todoContext);
        });
    }

    let renderEditButton = function(){
        todoButton = document.createElement("button");
        todoButton.type = "button";
        todoButton.innerText = "Edit";
        todoButton.addEventListener("click", () => {
            render(true);
        });
    }

    let render = function(isEditable){
        let oldElement = todoElement;
        renderMainElement(isEditable);
        renderTitle(isEditable);
        rednerDescription(isEditable);
        renderDueDate(isEditable);
        todoPriority = renderPriorityInput();
        renderCheckbox();
        todoSublist = renderSublist(isEditable);
        if(isEditable){
            todoSublistButton = renderSublistButton();
            todoButton = renderConfirmEditButton();
        } else {
            todoSublistButton = null;
            renderEditButton();
        }
        renderRemoveButton();
        if(parentElement.children.length === 0){
            parentElement.appendChild(todoElement);
        }
        
        refresh(oldElement);
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
            modifyTodo(todoContext);
            render(false);
            
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

    render(false);
    return todoElement;
}

export {makeTodoView};