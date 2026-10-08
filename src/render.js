import { makeTodo, getTodos, addTodo, priorityOptions } from "./todo.js";

let renderAddToForm = function(){
    let addTodoForm = document.createElement("form");
    addTodoForm.method = "POST";
    addTodoForm.action = "/";
    
    let todoTitleInput = document.createElement("input");
    todoTitleInput.type = "text";

    let todoDescInput = document.createElement("input");
    todoDescInput.type = "text";

    let todoDueDateInput = document.createElement("input");
    todoDueDateInput.type = "date";

    let todoPriorityInput = renderPriorityInput();
    
    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.innerText = "Submit";
    submitButton.addEventListener("click", () =>{
        addTodo(
            makeTodo(
                todoTitleInput.value,
                todoDescInput.value,
                todoDueDateInput.value,
                todoPriorityInput.value
        ));
        renderMainContent(true);
    });

    addTodoForm.appendChild(todoTitleInput);
    addTodoForm.appendChild(todoDescInput);
    addTodoForm.appendChild(todoDueDateInput);
    addTodoForm.appendChild(todoPriorityInput);
    addTodoForm.appendChild(submitButton);
    return addTodoForm;
}

let renderEditForm = function(todo){
    let todoElement = document.createElement("form");

    todoElement.method = "POST";
    todoElement.action = "/";
    let todoTitle = document.createElement("input");
    todoTitle.type = "text";
    todoTitle.value = todo.title;

    let todoDesc = document.createElement("input");
    todoDesc.type = "text";
    todoDesc.value = todo.description;

    let todoDueDate = document.createElement("input");
    todoDueDate.type = "date";
    todoDueDate.value = todo.dueDate;


    let todoPriority = renderPriorityInput();

    let todoChecked = document.createElement("input");
    todoChecked.type = "checkbox";
    if(todo.isDone){
        todoChecked.checked = true;
    }
    todoChecked.addEventListener("change", () => {
        todo.toggleIsDone();
    });


    let confirmEditButton = document.createElement("button");
    confirmEditButton.type = "button";
    confirmEditButton.innerText = "Confirm";
    confirmEditButton.addEventListener("click", () => {
        todo.title = todoTitle.value;
        todo.description = todoDesc.value;
        todo.dueDate = todoDueDate.value;
        todo.priority = todoPriority.value;
        console.log(todo.sublist);
        todoElement.parentElement.appendChild(renderTodo(todo));
        todoElement.remove();
        return;
    });

    todoElement.appendChild(todoTitle);
    todoElement.appendChild(todoDesc);
    todoElement.appendChild(todoDueDate);
    todoElement.appendChild(todoPriority);
    todoElement.appendChild(todoChecked);
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
        if(item.isDone){
            todoSublistItemChecked.checked = true;
        }
        todoSublistItemChecked.addEventListener("change", () => {
            item.toggleIsDone();
        });
        todoSublistElement.appendChild(todoSublistInput);
        todoSublistElement.appendChild(todoSublistItemChecked);
        todoSublist.appendChild(todoSublistElement);
    });

    todoElement.appendChild(todoSublist);
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
        if(sublistItem.isDone){
            todoSublistItemChecked.checked = true;
        }
        todoSublistItemChecked.addEventListener("change", () => {
            sublistItem.toggleIsDone();
        });
        todoSublistElement.appendChild(todoSublistInput);
        todoSublistElement.appendChild(todoSublistItemChecked);
        todoSublist.appendChild(todoSublistElement);
    });
    todoElement.appendChild(todoSublistButton);
    todoElement.appendChild(confirmEditButton);
    return todoElement;
}

let renderTodo = function(todo){
    let todoElement = document.createElement("div");
    
    let todoTitle = document.createElement("h2");
    todoTitle.innerText = todo.title;

    let todoDesc = document.createElement("p");
    todoDesc.innerText = todo.description;

    let todoDueDate = document.createElement("p");
    todoDueDate.innerText = todo.dueDate;

    let todoPriority = document.createElement("p");
    todoPriority.innerText = todo.priority;

    let todoChecked = document.createElement("input");
    todoChecked.type = "checkbox";
    if(todo.isDone){
        todoChecked.checked = true;
    }
    todoChecked.addEventListener("change", () => {
        todo.toggleIsDone();
    });

    let todoSublist = document.createElement("ul");
    todo.sublist.forEach(item => {
        let todoSublistItem = document.createElement("li");
        let todoSublistTitle = document.createElement("h4");
        todoSublistTitle.innerText = item.sublistTitle;
        let todoSublistItemChecked = document.createElement("input");
        todoSublistItemChecked.type = "checkbox";
        if(item.isDone){
            todoSublistItemChecked.checked = true;
        }
        todoSublistItemChecked.addEventListener("change", () => {
            item.toggleIsDone();
        });
        todoSublistItem.appendChild(todoSublistTitle);
        todoSublistItem.appendChild(todoSublistItemChecked);
        todoSublist.appendChild(todoSublistItem);
    });

    let todoEditButton = document.createElement("button");
    todoEditButton.type = "button";
    todoEditButton.innerText = "Edit";
    todoEditButton.addEventListener("click", () => {
        todoElement.innerHTML = "";
        todoElement.appendChild(renderEditForm(todo));
        return;

    });

    todoElement.appendChild(todoTitle);
    todoElement.appendChild(todoDesc);
    todoElement.appendChild(todoDueDate);
    todoElement.appendChild(todoPriority);
    todoElement.appendChild(todoChecked);
    todoElement.appendChild(todoSublist);
    todoElement.appendChild(todoEditButton);
    return todoElement;
}

let renderTodoList = function() {
    let todoList = document.createElement("list");
    getTodos().forEach(todo => {
        let todoListItem = document.createElement("ul");

        todoListItem.appendChild(renderTodo(todo));
        todoList.appendChild(todoListItem);
    });
    return todoList
}

let renderPriorityInput = function() {
    let todoPriorityInput = document.createElement("select")
    todoPriorityInput.name = "priority"

    priorityOptions.forEach(option => {
        let opitonInput = document.createElement("option");
        opitonInput.value = option;
        opitonInput.innerText = option;
        todoPriorityInput.appendChild(opitonInput);
    });
    return todoPriorityInput;
}

let renderAddTodoButton = function(mainContent){
    let addTodoButton = document.createElement("button");
    addTodoButton.type = "button";
    addTodoButton.innerText = "Add New Todo";
    addTodoButton.addEventListener("click", () => {
        let addTodoForm = renderAddToForm();
        mainContent.appendChild(addTodoForm);
        addTodoButton.disabled = true;
    });
    return addTodoButton;
}

let renderMainContent = function(clear) {

    let mainBody = document.querySelector("#main");
    if(clear){
        mainBody.innerHTML = "";
    }
    mainBody.appendChild(renderTodoList());
    let addTodoButton = renderAddTodoButton(mainBody);
    mainBody.appendChild(addTodoButton);
    
}

export default renderMainContent;