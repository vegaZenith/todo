let todos = [];
let priorityOptions = ["Low", "Medium", "High"];
let currentID = 1;

let makeSublistItem = function(title){
    let sublistTitle = title;
    let isDone = false;

    let setTitle = function(newTitle){
        this.sublistTitle = newTitle;
    }

    let toggleIsDone = function(){
        this.isDone = !this.isDone;
    }

    return {
        sublistTitle,
        isDone,
        setTitle,
        toggleIsDone
    };
}
let areEqual = function(a, b){
    return  a.title === b.title &&
            a.description === b.description &&
            a.dueDate === b.dueDate &&
            a.priority === b.priority;
}

let removeTodo = function(todo){
    let toRemove;
    todos.forEach(curr => {
        if(areEqual(todo, curr)){
            toRemove = curr;
        }
    })
    todos = todos.filter(todo => todo !== toRemove);
    localStorage.removeItem("todo-"+toRemove.id);
}

let makeTodo = function(t, d, date, p){
    let id = currentID++;
    let title = t;
    let description = d;
    let dueDate = date;
    let priority = p;
    let notes = "";
    let sublist = [];
    let isDone = false;

    function setTitle(newTitle){
        this.title = newTitle;
    }

    function setDescription(newDesc){
        this.description = newDesc;
    }

    function setDueDate(newDueDate){
        this.dueDate = newDueDate;
    }

    function setPriority(newPriority){
        this.priority = newPriority;
    }

    function setNotes(newNotes){
        this.notes = newNotes;
    }

    function toggleIsDone(){
        this.isDone = !this.isDone;
    }

    function addToSublist(title){
        let sublistItem = makeSublistItem(title);
        this.sublist.push(sublistItem);
        return sublistItem;
    }

    function removeFromSublist(item){
        this.sublist = this.sublist.filter(sub => sub.sublistTitle !== item.sublistTitle);
    }

    return {
        title,
        description,
        dueDate,
        priority,
        notes,
        sublist,
        isDone,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        setNotes,
        addToSublist,
        toggleIsDone,
        removeFromSublist,
        id
    }

};

let addTodo = function(todo){
    todos.push(todo);
    console.log("add");
    console.log(todo.sublist);

    localStorage.setItem("todo-"+todo.id, JSON.stringify(todo));
};

let getTodos = function(){
    return todos;
}

let loadTodos = function(){
    let id = 1;
    let curr = "todo-" + id;
    while(localStorage.getItem(curr) != undefined){
        let todoParsed = JSON.parse(localStorage.getItem(curr));
        console.log("load");
        console.log(todoParsed.sublist);
        let todo = makeTodo(todoParsed.title, todoParsed.description, todoParsed.dueDate, todoParsed.priority);
        todo.isDone = todoParsed.isDone;
        todoParsed.sublist.forEach(item => {
            let newItem = todo.addToSublist(item.sublistTitle);
            newItem.isDone = item.isDone;
        });
        todos.push(todo);
        console.log(todo);
        id++;
        curr = "todo-"+id;
    }
}

let modifyTodo = function(todo){
    let todoKey = "todo-" + todo.id;
    console.log("mod");
    console.log(todo.sublist);
    localStorage.setItem(todoKey, JSON.stringify(todo));
}

export {makeTodo, addTodo, getTodos, removeTodo, priorityOptions, loadTodos, modifyTodo};