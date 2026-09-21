import makeTodo from "./todo.js";
import {render, renderMain} from "./render.js"
let myTodo = makeTodo();

myTodo.setTitle("My Todo");
myTodo.setDescription("This is something I need to do");
myTodo.setDueDate(new Date());
myTodo.setPriority("Low");

renderMain();
// render(myTodo);