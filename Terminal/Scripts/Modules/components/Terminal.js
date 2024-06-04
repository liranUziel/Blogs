/**
 * @name Terminal
 * @author Liran Uziel
 * @description Terminal object is the main class of the Terminal.js library.
 *
 * @class Terminal
 * @param TerminalScreen - object responsable of "terminal screen" mainipulation.
 */
import { TerminalScreen } from "./TerminalScreen.js";

export class Terminal {
    #TreminalContainer;
    #TreminalScreen;
    constructor() {
        // console.log("Terminal created");
        const treminalDiv = document.getElementById("Terminal");
        if (treminalDiv !== null) {
            this.#TreminalContainer = treminalDiv;
        } else {
            this.#TreminalContainer = document.createElement("div");
            this.#TreminalContainer.id = "Terminal";
        }
        // Look if #Terminal exist
        this.#TreminalScreen = new TerminalScreen();

        this.render();
    }
    render() {
        this.#TreminalScreen.appendToParent(this.#TreminalContainer);
        this.#TreminalScreen.render();
    }
}
