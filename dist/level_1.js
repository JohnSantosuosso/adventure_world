"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const riddle_1 = require("./riddle");
const welcome_1 = require("./welcome");
const inquirer_1 = __importDefault(require("inquirer"));
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function outskirtsCity() {
    const newCharacter = await (0, welcome_1.selectCharacter)();
    if (newCharacter) {
        await delay(5000);
        console.log(`\nYou're standing on the outskirts of a medieval village.  Dark smoke billows from inside the village as the screams of the inhabitants pierce the air.`);
        await delay(5000);
        console.log(`\nYou notice a scorched wooden sign next to the dilapidated stone walls surrounding the village...`);
        await delay(5000);
        console.log(`\n"Welcome to Lumbridge"`);
        console.log('\n');
        await delay(5000);
        console.clear();
        console.log(`\nYou shudder at the thought of interacting with the peasants that populate this godforsaken place...`);
        await delay(7000);
        console.clear();
        await oldWizardApproaches(newCharacter);
        await oldWizardQuestions(newCharacter);
        await acceptQuest(newCharacter);
    }
    else {
        console.log('Character is not defined');
    }
}
async function oldWizardApproaches(newCharacter) {
    if (newCharacter) {
        console.log(`"${newCharacter.name} the ${newCharacter.category}!! ${newCharacter.name} the ${newCharacter.category}!!"`);
        await delay(5000);
        console.log(`\nA crooked old man with a dirty white beard hobbles into view.`);
        await delay(5000);
        console.log(`\nAs he gets closer, the first thing you notice is the smell...`);
        await delay(5000);
        console.clear();
        console.log(`\n"What took you so long?! There has been a great disaster, a great disaster I say!"`);
        await delay(5000);
        console.log(`\nThe odor of rancid meat and disease seeps into your nostrils...`);
        await delay(5000);
        console.log(`\nThe old man is smiling at you.  The few teeth left in his mouth are rotting.  The stench is nearly unbearable...`);
        await delay(5000);
    }
}
async function oldWizardQuestions(newCharacter) {
    if (newCharacter) {
        console.clear();
        console.log(`"Oh heavens, oh heavens, oh heavens!! You do not look like the great ${newCharacter.name} the ${newCharacter.category}!"`);
        await delay(5000);
        console.log(`\n"I was expecting you to be...taller...and stronger...and...`);
        await delay(5000);
        console.log(`\n...more intelligent looking..."`);
        await delay(5000);
        console.clear();
        console.log(`\nThe old man repulsively grins at you.  His tattered clothing reeks of rat urine.`);
        await delay(5000);
        console.clear();
        console.log(`\n"I say, you must prove to me that you are indeed the great ${newCharacter.name} the ${newCharacter.category}!"`);
        console.clear();
        await delay(5000);
        console.log(`\n"What is it that you want to know, you dirty old man?  That I am indeed the great ${newCharacter.name} the ${newCharacter.category}?" `);
        await delay(5000);
        console.clear();
        console.log(`\nHis dark eyes show a glimmer of hope before he answers...`);
        await delay(5000);
        console.log(`\n"Yes, yes, yes my ${newCharacter.category} friend"`);
        await delay(5000);
        console.clear();
        console.log(`\n"I propose you answer a riddle for me.  A riddle that only the great ${newCharacter.name} the ${newCharacter.category} would know..."`);
        await delay(5000);
        console.clear();
    }
}
async function acceptQuest(newCharacter) {
    if (newCharacter) {
        return inquirer_1.default
            .prompt({
            type: 'list',
            name: 'option',
            message: '\nWhat would you like to do?',
            choices: ['Answer Riddle', 'Run', 'Quit']
        })
            .then(answer => {
            switch (answer.option) {
                case 'Answer Riddle':
                    console.clear();
                    console.log(`"Ah yes, yes, yes, excellent...I shall test your wits to see if you are indeed the great ${newCharacter.name} the ${newCharacter.category}"!`);
                    delay(5000);
                    console.clear();
                    let currentRiddle = riddle_1.Riddle.getRandomRiddle();
                    return inquirer_1.default
                        .prompt([
                        {
                            type: 'input',
                            name: 'riddle',
                            message: currentRiddle.question,
                        },
                    ])
                        .then(async (answer) => {
                        if (answer.riddle.toLowerCase() === currentRiddle.answer.toLowerCase()) {
                            console.clear();
                            console.log(`The old man begins clapping...`);
                            await delay(3000);
                            console.log(`"Yes, yes I knew it!  You are indeed the ${newCharacter.name} the ${newCharacter.category}"`);
                            await delay(5000);
                            console.clear();
                            console.log(`Come with me now friend.  We have a great adventure to go on!!"`);
                            await delay(5000);
                            console.clear();
                            console.log(`To be continued...`);
                            await delay(10000);
                        }
                        else {
                            console.clear();
                            console.log(`The old man begins to get angry...`);
                            await delay(3000);
                            console.log(`You do not appear to be ${newCharacter.name} the ${newCharacter.category}!!  I, however, am a kind wizard and I shall give you another chance..."`);
                            await delay(5000);
                            console.clear();
                            return acceptQuest(newCharacter);
                        }
                    });
                case 'Run':
                    console.log(`"Coward!! How dare you claim to be the great ${newCharacter.name} the ${newCharacter.category}"`);
                    delay(5000);
                    console.log(`The old man strikes you with his fist`);
                    newCharacter.health -= 10;
                    delay(5000);
                    console.log(`Your health is now ${newCharacter.health}.  Coward.`);
                    console.log(`"Let's try this once again..."`);
                    delay(5000);
                    acceptQuest(newCharacter);
                    break;
                case 'Quit':
                    console.log(`"There is no quitting before you begin!! How dare you claim to be the great ${newCharacter.name} the ${newCharacter.category}"`);
                    // deduct health and rerun question
                    break;
            }
        });
    }
}
outskirtsCity();
