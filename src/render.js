import {makeTodo, getTodos, addTodo} from "./todo.js";

let renderMain = function(){
    let body = document.querySelector("#main");
    body.innerHTML = "";
    let todoList = document.createElement("div");
    todoList.setAttribute("id", "todo-list");
    let addButton = document.createElement("button");
    addButton.innerText = "Add";

    var createFormInput = function(type){
        let formInput = document.createElement("input");
        formInput.setAttribute("type", type);
        return formInput;
    }

    body.appendChild(todoList);
    renderAllTodos();
    body.appendChild(addButton);
    addButton.addEventListener("click", () => {
        addButton.disabled = true;
        let todoForm = document.createElement("form");
        todoForm.setAttribute("action", "index.html");
        todoForm.setAttribute("method", "post")
        let titleInput = createFormInput("text");
        let descriptionInput = createFormInput("text");
        let dueDateInput = createFormInput("date");
        let priorityInput = createFormInput("text");
        let submitButton = document.createElement("button");
        
        submitButton.innerText = "Submit";
        submitButton.setAttribute("type", "button");
        submitButton.addEventListener("click", () => {
            let newTodo = makeTodo();
            newTodo.title = titleInput.value;
            newTodo.description = descriptionInput.value;
            newTodo.dueDate = dueDateInput.value;
            newTodo.priority = priorityInput.value;
            addTodo(newTodo);      
            renderMain();  
        });
        todoForm.appendChild(titleInput);
        todoForm.appendChild(descriptionInput);
        todoForm.appendChild(dueDateInput);
        todoForm.appendChild(priorityInput);
        todoForm.appendChild(submitButton);
        body.appendChild(todoForm);
    });
};

let renderAllTodos = function(){
    let todos = getTodos();
    let todoList = document.querySelector("#todo-list");
    todos.forEach(todo => {
        let todoElement = renderTodo(todo);
        todoList.appendChild(todoElement);
    });
}

let renderTodo = function(todo){
    let todoBody = document.createElement("div");
    let title = document.createElement("h2");
    title.textContent = todo.title;
    let description = document.createElement("p");
    description.innerText = todo.description;
    let dueDate = document.createElement("h3");
    dueDate.innerText = todo.dueDate;
    let priority = document.createElement("h3");
    priority.innerText = todo.priority;
    let checked = document.createElement("input");
    checked.setAttribute("type", "checkbox");
    if(todo.isDone){
        checked.setAttribute("checked");
    }
    let notes = document.createElement("p");
    notes = todo.notes;

    todoBody.appendChild(title);
    todoBody.appendChild(description);
    todoBody.appendChild(dueDate);
    todoBody.appendChild(priority);
    todoBody.appendChild(checked);
    if(todo.sublist !== null && todo.sublist.length > 0){
        let sublist = document.createElement("ul");
        todo.sublist.foreach(i => {
            let item = document.createElement("li");
            let itemDesc = document.createElement("p");
            let itemChecked = document.createElement("input");
            checked.setAttribute("type", "checkbox");
            item.appendChild(itemDesc);
            item.appendChild(itemChecked);
            sublist.appendChild(item);
        });
        todoBody.appendChild(sublist);
    }
    // todoBody.appendChild(notes);
    return todoBody;
}

export default renderMain;