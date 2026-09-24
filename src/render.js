import { makeTodo, getTodos, addTodo } from "./todo.js";

let createFormInput = function (type) {
    let formInput = document.createElement("input");
    formInput.setAttribute("type", type);
    return formInput;
}

let createSelectOption = function (value, content) {
    let option = document.createElement("option");
    option.setAttribute("value", value);
    option.innerText = content;
    return option;
}

let renderAddTodoForm = function () {
    let todoForm = document.createElement("form");
    todoForm.setAttribute("action", "index.html");
    todoForm.setAttribute("method", "post")
    let titleInput = createFormInput("text");
    let descriptionInput = createFormInput("text");
    let dueDateInput = createFormInput("date");
    let priorityInput = document.createElement("select");
    priorityInput.setAttribute("name", "priority");
    priorityInput.appendChild(createSelectOption("Low", "Low"));
    priorityInput.appendChild(createSelectOption("Medium", "Medium"));
    priorityInput.appendChild(createSelectOption("High", "High"));

    let submitButton = document.createElement("button");

    submitButton.innerText = "Submit";
    submitButton.setAttribute("type", "button");
    submitButton.addEventListener("click", () => {
        // create new todo list
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
    return todoForm
}

let renderMain = function () {
    //clear main content element
    let body = document.querySelector("#main");
    body.innerHTML = "";
    //create todo list
    let todoList = renderAllTodos();
    let addButton = document.createElement("button");
    addButton.innerText = "Add";

    body.appendChild(todoList);
    body.appendChild(addButton);

    // add new todo list
    addButton.addEventListener("click", () => {
        // create new todo list form
        addButton.disabled = true;

        body.appendChild(renderAddTodoForm());
    });
};


let renderAllTodos = function () {
    let todoList = document.createElement("div");
    todoList.setAttribute("id", "todo-list");
    let todos = getTodos();
    todos.forEach(todo => {
        let todoElement = renderTodo(todo);
        todoList.appendChild(todoElement);
    });
    return todoList;
}

let renderEditTodoForm = function (todo) {
    let editForm = document.createElement("form");
    editForm.setAttribute("action", "index.html");
    editForm.setAttribute("method", "post")
    let titleInput = createFormInput("text");
    titleInput.value = todo.title;
    let descriptionInput = createFormInput("text");
    descriptionInput.value = todo.description;
    let dueDateInput = createFormInput("date");
    dueDateInput.value = todo.dueDate;
    let priorityInput = document.createElement("select");

    priorityInput.setAttribute("name", "priority");
    priorityInput.appendChild(createSelectOption("Low", "Low"));
    priorityInput.appendChild(createSelectOption("Medium", "Medium"));
    priorityInput.appendChild(createSelectOption("High", "High"));
    priorityInput.value = todo.priority;

    let confirmButton = document.createElement("button");
    confirmButton.innerText = "Confirm";
    confirmButton.addEventListener("click", () => {
        todo.title = titleInput.value;
        todo.description = descriptionInput.value;
        todo.dueDate = dueDateInput.value;
        todo.priority = priorityInput.value;
        renderMain();
    });

    editForm.appendChild(titleInput);
    editForm.appendChild(descriptionInput);
    editForm.appendChild(dueDateInput);
    editForm.appendChild(priorityInput);
    editForm.appendChild(confirmButton);
    return editForm;
}

let renderTodo = function (todo) {
    // render individual elements
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
    if (todo.isDone) {
        checked.setAttribute("checked");
    }
    let notes = document.createElement("p");
    notes = todo.notes;

    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", () => {
        todoBody.appendChild(renderEditTodoForm(todo));
    });

    todoBody.appendChild(title);
    todoBody.appendChild(description);
    todoBody.appendChild(dueDate);
    todoBody.appendChild(priority);
    todoBody.appendChild(checked);
    todoBody.appendChild(editButton);
    if (todo.sublist !== null && todo.sublist.length > 0) {
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