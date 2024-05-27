"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Riddle = void 0;
class Riddle {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
    static getRandomRiddle() {
        const randomIndex = Math.floor(Math.random() * Riddle.riddleCollection.length);
        return Riddle.riddleCollection[randomIndex];
    }
}
exports.Riddle = Riddle;
Riddle.riddleCollection = [
    {
        question: "What has keys but can't open locks?",
        answer: "A piano"
    },
    {
        question: "What has to be broken before you can use it?",
        answer: "An egg"
    },
    {
        question: "What is full of holes but still holds water?",
        answer: "A sponge"
    },
    {
        question: "What question can you never answer yes to?",
        answer: "Are you asleep yet?"
    },
    {
        question: "What is always in front of you but can’t be seen?",
        answer: "The future"
    }
];
