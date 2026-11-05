import { getProjects, makeProject, addProject } from "./project.js";
import { makeProjectView } from "./renderProject.js";

let renderMainContent = function(clear) {
    let mainBody = document.querySelector("#main");
    if(clear){
        mainBody.innerHTML = "";
    }
    if(getProjects().length < 1){
        addProject(makeProject());
    }
    let projectsList = document.createElement("ul");
    projectsList.setAttribute("class", "projects");
    getProjects().forEach(p => {
        let projectListItem = document.createElement("li");
        projectListItem.setAttribute("class", "project");
        projectListItem.appendChild(makeProjectView(p));
        projectsList.appendChild(projectListItem);
    });
    mainBody.appendChild(projectsList);
}

export default renderMainContent;