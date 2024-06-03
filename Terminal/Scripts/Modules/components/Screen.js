import { TerminalInputs } from "./TerminalInput.js";
import { TerminalEvents } from "./TerminalEvents.js";
const CMD_PREFIX = "> ";
export class Screen {
    // TreminalScreen, a perent object pass it's handler and id.
    #SceenContainer;
    #SceenInput;
    #SceenDisplay;
    #inputText = "";
    #TerminalInputs;
    #TerminalScreenonUpdate;
    constructor(TerminalScreenonUpdate) {
        // console.log("Screen created");
        this.#TerminalScreenonUpdate = TerminalScreenonUpdate;
        const screendiv = document.getElementById("Screen");
        if (screendiv !== null) {
            this.#SceenContainer = screendiv;
        } else {
            this.#SceenContainer = document.createElement("div");
            this.#SceenContainer.id = "Screen";
        }
        const screenUl = document.getElementById("ScreenDisplay");
        if (screendiv !== null) {
            this.#SceenDisplay = screendiv;
        } else {
            this.#SceenDisplay = document.createElement("ul");
            this.#SceenDisplay.id = "ScreenDisplay";
        }
        const screenInpt = document.getElementById("ScreenInput");
        if (screendiv !== null) {
            this.#SceenInput = screendiv;
        } else {
            this.#SceenInput = document.createElement("input");
            this.#SceenInput.id = "ScreenInput";
        }
        this.#SceenInput.setAttribute("value", CMD_PREFIX);
        this.#SceenInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                // creat eventObject base on event.target.value
                // this.#TerminalInputs.onEvent(eventObject);
                // this.#TerminalScreenonUpdate(eventObject);
                this.#inputText = "> ";
                event.target.value = this.#inputText;
            }
        });
        this.#SceenInput.addEventListener("input", (event) => {
            this.#inputText = "> " + event.target.value;
            if (!event.target.value.startsWith("> ")) {
                this.#inputText = "> ";
                event.target.value = this.#inputText;
            }
        });
        this.#TerminalInputs = new TerminalInputs(this.onUpdate);
    }
    appendToParent(docElement) {
        if (docElement instanceof HTMLElement) {
            docElement.append(this.#SceenContainer);
        }
    }
    render() {
        this.#SceenContainer.append(this.#SceenDisplay);
        this.#SceenContainer.append(this.#SceenInput);
    }
    onUpdate(event) {
        console.log(`Screen event handle ${event}`);
    }
}
