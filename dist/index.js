"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoList_1 = require("./todoList");
const inquirer_1 = __importDefault(require("inquirer"));
let todos = [
    new todoItem_1.TodoItem(1, "Learn TypeScript"), new todoItem_1.TodoItem(2, "Play Sun Haven"), new todoItem_1.TodoItem(3, "Create Pixel Art for Game"), new todoItem_1.TodoItem(4, "Finish Loki", true)
];
let list = new todoList_1.TodoList("Jonathan", todos);
function displayTodoList() {
    console.log(`${list.userName}'s Todo List ` + `(${list.getItemCounts().incomplete} items to do)`);
    list.getTodoItems(true).forEach(item => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer_1.default
        .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands)
    }).then((answers) => {
        if (answers["command"] !== Commands.Quit) {
            promptUser();
        }
    });
}
promptUser();
