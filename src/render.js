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

let renderTodo = function(todo){
    let todoElement = document.createElement("div");
    
    let todoTitle = document.createElement("h2");
    todoTitle.innerText = todo.title;

    let todoDesc = document.createElement("p");
    todoDesc.innerText = todo.description;

    let todoDueDate = document.createElement("p");
    todoDueDate.innerText = todo.dueDate;

    let todoChecked = document.createElement("input");
    todoChecked.type = "checkbox";
    if(todo.isDone){
        todoChecked.checked = true;
    }
    todoChecked.addEventListener("change", () => {
        todo.toggleIsDone();
    });

    todoElement.appendChild(todoTitle);
    todoElement.appendChild(todoDesc);
    todoElement.appendChild(todoDueDate);
    todoElement.appendChild(todoChecked);
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