import { Character } from './character';
import inquirer from "inquirer";

let newCharacter: Character | undefined;

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function selectCharacter(): Promise<Character> { //use Character to resolve, not void because we want the Promise to return a value
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'userName',
        message: '\nWelcome to Adventure World.  What is your name?',
        validate(value) {
          if (value.length <= 10 && value.length > 1) {
            return true;
          } else {
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
        newCharacter = new Character(answers.userName, answers.userCategory, 100); //what we want to resolve with (not void, void only used when not return a value)
        console.log(`\nWelcome to Adventure World, ${newCharacter.name} the ${newCharacter.category}!`);
        await delay(3000);
        console.clear();
        await gameOptions(newCharacter);
        return newCharacter;
      } else {
        return selectCharacter();
      }
    });
}

export async function gameOptions(character: Character): Promise<void> {
  return inquirer
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
          return inquirer
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
          return inquirer
            .prompt({
              type: 'confirm',
              name: 'confirmGetStarted',
              message: `\nAre you sure you're ready to begin your quest?`,
              default: true
            })
            .then((confirm) => {
              if (confirm.confirmGetStarted) {
                return loadingScreen();
              } else {
                console.clear();
                return gameOptions(character); // Present the options again
              }
            });
        case 'Quit':
          return Promise.resolve();
      }
    });
}

export function loadingScreen(): Promise<void> {
  console.log(`\nLoading...please wait...`)
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

export { newCharacter };