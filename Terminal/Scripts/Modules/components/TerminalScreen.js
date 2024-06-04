// Control the visual of the Terminal
// Color and display

import { Screen } from "./Screen.js";
import { TerminalEvents } from "./TerminalEvents.js";

export class TerminalScreen {
    #TreminalScreenContainer;
    #Screens;
    constructor() {
        // console.log("Terminal Screen created");
        const treminalDiv = document.getElementById("TerminalScreen");
        if (treminalDiv !== null) {
            this.#TreminalScreenContainer = treminalDiv;
        } else {
            this.#TreminalScreenContainer = document.createElement("div");
            this.#TreminalScreenContainer.id = "TerminalScreen";
        }
        this.#Screens = [];
        this.#Screens.push(new Screen(this.#Screens.length, this.onUpdate));
    }
    appendToParent(docElement) {
        if (docElement instanceof HTMLElement) {
            docElement.append(this.#TreminalScreenContainer);
        }
    }
    render() {
        for (const screen of this.#Screens) {
            screen.appendToParent(this.#TreminalScreenContainer);
            screen.render(this.#TreminalScreenContainer);
        }
    }
    onUpdate(event) {
        console.log(`TreminalScreen event handle ${event}`);
    }
}
