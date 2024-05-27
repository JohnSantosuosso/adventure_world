export class Character {
  constructor(
              public name: string,
              public category: string,
              public health: number,
            ) {
  }

  printAttributes(): void {
    console.log(`${this.name} ${this.category} ${this.health}`);
  }
}