import { makeTodoView } from "./renderTodo.js";
import { makeTodo, getTodos, addTodo, priorityOptions } from "./todo.js";

let makeProjectView = function (project) {
    console.log(project);
    let projectContext = project;
    console.log(projectContext);
    let projectTitle;
    let todos;
    let addTodoButton;
    let projectElement;

    let renderTitle = function () {
        projectTitle = document.createElement("h1");
        console.log(projectContext)
        projectTitle.innerText = projectContext.title;
    }

    let renderPriorityInput = function () {
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

    let renderAddTodoForm = function () {
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
        submitButton.addEventListener("click", () => {
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

    let renderTodos = function () {
        todos = document.createElement("ul");
        getTodos().forEach(todo => {
            let todoListItem = document.createElement("li");

            makeTodoView(todo, todoListItem);
            todos.appendChild(todoListItem);
        });
    }

    let renderAddTodoButton = function (mainContent) {
        let addTodoButton = document.createElement("button");
        addTodoButton.type = "button";
        addTodoButton.innerText = "Add New Todo";
        addTodoButton.addEventListener("click", () => {
            let addTodoForm = renderAddTodoForm();
            mainContent.appendChild(addTodoForm);
            addTodoButton.disabled = true;
        });
        return addTodoButton;
    }

    let render = function () {
        projectElement = document.createElement("div");
        renderTitle();
        renderTodos();
        addTodoButton = renderAddTodoButton();
        projectElement.replaceChildren();
        projectElement.appendChild(projectTitle);
        projectElement.appendChild(todos);
        projectElement.appendChild(addTodoButton);
    }

    render();
    return projectElement;
}

export { makeProjectView };