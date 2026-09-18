let makeTodo = function(){
    let title = "";
    let description = "";
    let dueDate = "";
    let priority = null;
    let notes = "";
    let sublist = null;
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

    function createSublist(){
        this.sublist = [];
    }

    function toggleIsDone(){
        this.isDone = !isDone;
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
        createSublist,
        toggleIsDone
    }

};

export default makeTodo;