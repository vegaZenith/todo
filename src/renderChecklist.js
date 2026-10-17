let makeChecklistRendering = function(todo){
    let todoContext = todo;
    let todoChecklistElement = document.createElement("ul");

    let render = function(isEditable){
        todoChecklistElement.replaceChildren();
        todoContext.sublist.forEach(item => {
            let todoChecklisttItem = document.createElement("li");
            let checklistItemTitle = renderChecklistItemTitle(item, isEditable);
            let checklistItemChecked = document.createElement("input");
            checklistItemChecked.type = "checkbox";
            if (item.isDone) {
                checklistItemChecked.checked = true;
            }
            checklistItemChecked.addEventListener("change", () => {
                item.toggleIsDone();
            });
            let removeChecklistItemButton = document.createElement("button");
            removeChecklistItemButton.type = "button";
            removeChecklistItemButton.textContent = "Remove";
            removeChecklistItemButton.addEventListener("click", () => {
                todoChecklistElement.removeChild(todoChecklisttItem);
                todoContext.removeFromSublist(item);
            });
            todoChecklisttItem.appendChild(checklistItemTitle);
            todoChecklisttItem.appendChild(checklistItemChecked);
            todoChecklisttItem.appendChild(removeChecklistItemButton);
            todoChecklistElement.appendChild(todoChecklisttItem);
        });
        return todoChecklistElement;
    }

    let renderChecklistItemTitle = function(item, isEditable){
        let checklistItemTitle;
        if(isEditable){
            checklistItemTitle = document.createElement("input");
            checklistItemTitle.type = "text";
            checklistItemTitle.value = item.sublistTitle;
            checklistItemTitle.addEventListener("change", () => {
                item.setTitle(checklistItemTitle.value);
            });
        } else {
            checklistItemTitle = document.createElement("h4");
            checklistItemTitle.innerText = item.sublistTitle;
        }
        return checklistItemTitle;
    }

    return {
        render: render
    }
}

export {makeChecklistRendering};


