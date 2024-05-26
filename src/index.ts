import { TodoItem } from "./todoItem";
import { TodoList } from "./todoList";
import inquirer from "inquirer";

let todos: TodoItem[] = [
  new TodoItem(1, "Learn TypeScript"), new TodoItem(2, "Play Sun Haven"), new TodoItem(3, "Create Pixel Art for Game"), new TodoItem(4, "Finish Loki", true)];
let list: TodoList = new TodoList("John", todos);
function displayTodoList(): void {
  console.log(`${list.userName}'s Todo List ` + `(${ list.getItemCounts().incomplete } items to do)`);
  list.getTodoItems(true).forEach(item => item.printDetails());
}
enum Commands {
  Quit = "Quit"
}
function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands)
    }).then((answers: { [x: string]: Commands; }) => {
      if (answers["command"] !== Commands.Quit) {
        promptUser();
      }
    })
}
promptUser();
