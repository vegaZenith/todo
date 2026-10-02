let todos = [];
let priorityOptions = ["Low", "Medium", "High"];

let makeSublistitem = function(title){
    let sulistTitle = title;
    let isDone = false;

    function setTitle(newTitle){
        this.title = newTitle;
    }

    function toggleIsDone(){
        this.isDone = !this.isDone;
    }

    return {
        sulistTitle,
        isDone,
        setTitle,
        toggleIsDone
    };
}

let makeTodo = function(t, d, date, p){
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
        this.isDone = !isDone;
    }

    function addToSublist(title){
        this.sublist.push(makeSublistitem(title));
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
        toggleIsDone
    }

};

let addTodo = function(todo){
    todos.push(todo);
};

let getTodos = function(){
    return todos;
}



export {makeTodo, addTodo, getTodos, priorityOptions};