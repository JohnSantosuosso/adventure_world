"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCharacter = exports.loadingScreen = exports.gameOptions = exports.selectCharacter = void 0;
const character_1 = require("./character");
const inquirer_1 = __importDefault(require("inquirer"));
let newCharacter;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function selectCharacter() {
    return inquirer_1.default
        .prompt([
        {
            type: 'input',
            name: 'userName',
            message: '\nWelcome to Adventure World.  What is your name?',
            validate(value) {
                if (value.length <= 10 && value.length > 1) {
                    return true;
                }
                else {
                    return '\nPlease enter a valid name up to 10 characters';
                }
            }
        },
        {
            type: 'list',
            name: 'userCategory',
            message: '\nSelect your character',
            choices: ['Orc', 'Knight', 'Elf']
        },
        {
            type: 'confirm',
            name: 'confirmCategory',
            message: (answers) => `\nYou have selected ${answers.userCategory}. Are you sure?`,
            default: true
        }
    ])
        .then(async (answers) => {
        if (answers.confirmCategory) {
            console.clear();
            exports.newCharacter = newCharacter = new character_1.Character(answers.userName, answers.userCategory, 100); //what we want to resolve with (not void, void only used when not return a value)
            console.log(`\nWelcome to Adventure World, ${newCharacter.name} the ${newCharacter.category}!`);
            await delay(3000);
            console.clear();
            await gameOptions(newCharacter);
            return newCharacter;
        }
        else {
            return selectCharacter();
        }
    });
}
exports.selectCharacter = selectCharacter;
async function gameOptions(character) {
    return inquirer_1.default
        .prompt({
        type: 'list',
        name: 'option',
        message: '\nSelect an option to continue',
        choices: ['How To Play', 'Get Started', 'Quit']
    })
        .then(answer => {
        switch (answer.option) {
            case 'How To Play':
                console.clear();
                console.log('\n--------------------------------------------------------------------------------------------------------------------------------------------');
                console.log('\nAdventure World is a quest-based game that gives you the opportunity to solve puzzles, battle villians, and earn gold.');
                console.log(`\nYou begin the the game with a health level of 100 and 30 gold coins.  As you embark on quests, you can earn more gold, but beware of dragons!`);
                console.log('\n--------------------------------------------------------------------------------------------------------------------------------------------');
                return inquirer_1.default
                    .prompt({
                    type: 'list',
                    name: 'return',
                    message: '\nWhat would you like to do next?',
                    choices: ['Return to Game Options']
                })
                    .then(() => {
                    console.clear();
                    return gameOptions(character); // Present the options again
                });
            case 'Get Started':
                console.clear();
                return inquirer_1.default
                    .prompt({
                    type: 'confirm',
                    name: 'confirmGetStarted',
                    message: `\nAre you sure you're ready to begin your quest?`,
                    default: true
                })
                    .then((confirm) => {
                    if (confirm.confirmGetStarted) {
                        return loadingScreen();
                    }
                    else {
                        console.clear();
                        return gameOptions(character); // Present the options again
                    }
                });
            case 'Quit':
                return Promise.resolve();
        }
    });
}
exports.gameOptions = gameOptions;
function loadingScreen() {
    console.log(`\nLoading...please wait...`);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`\n...beware of dragons...`);
            setTimeout(() => {
                console.log(`\nLoading...complete`);
                setTimeout(() => {
                    console.log('\n----------------------------------------------------------------------------------------------------------------------------');
                    console.log('\nLevel 1: The Journey Begins');
                    console.log('\n');
                    resolve();
                }, 3000);
            }, 1000);
        }, 1000);
    });
}
exports.loadingScreen = loadingScreen;
