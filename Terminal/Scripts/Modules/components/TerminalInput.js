//  Handles user input and command
import { TerminalEvents } from "./TerminalEvents.js";

export class TerminalInputs {
    // Handles user input and command
    #ScreenUpdate;
    constructor(onUpdate) {
        // console.log("TerminalInputs created");
        this.#ScreenUpdate = onUpdate;
    }
    onEvent(event) {
        console.log(`TeminalInput event handle ${event}`);
        this.#ScreenUpdate(event);
    }
}
