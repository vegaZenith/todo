let projects = [];
let makeProject = function(){
    let title = "New Project";
    let todos = [];
    
    let setTitle = function(newTitle){
        this.title = newTitle;
    }

    let addTodo = function(todo){
        this.todos.push(todo);
    }

    let removeTodo = function(todo){
        this.todos = this.todos.filter(t => t != todo);
    }
    return {title, setTitle, addTodo, removeTodo, todos};
}

let getProjects = function(){
    return projects;
}

let removeProject = function(project){
    projects = projects.filter(p => p != project);
}

let addProject = function(project){
    projects.push(project);
}

export {makeProject, getProjects, removeProject, addProject };