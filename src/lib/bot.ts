import type { Message } from "./message";

export class Bot {
    constructor(
        public id: string,
        public name: string,
        public history: Message[],
        public groups: string[]
    ) {
        console.log(`Bot ${this.name} loaded`)
    }
}
