"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
class Character {
    constructor(name, category, health) {
        this.name = name;
        this.category = category;
        this.health = health;
    }
    printAttributes() {
        console.log(`${this.name} ${this.category} ${this.health}`);
    }
}
exports.Character = Character;
