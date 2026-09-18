let render = function(todo){
    let body = document.querySelector("body");
    let todoBody = document.createElement("div");
    let title = document.createElement("h2");
    title.textContent = todo.title;
    let description = document.createElement("p");
    description.innerText = todo.description;
    let dueDate = document.createElement("h3");
    dueDate.innerText = todo.dueDate;
    let priority = document.createElement("h3");
    priority.innerText = todo.priority;
    

    body.appendChild(todoBody);
    todoBody.appendChild(title);
    todoBody.appendChild(description);
    todoBody.appendChild(dueDate);
    todoBody.appendChild(priority);
}

export default render;