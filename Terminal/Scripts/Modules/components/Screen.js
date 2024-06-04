import { TerminalInputs } from "./TerminalInput.js";
import { TerminalEvents } from "./TerminalEvents.js";
const CMD_PREFIX = "> ";
export class Screen {
    // TreminalScreen, a perent object pass it's handler and id.
    #SceenContainer;
    #InputPrefix;
    #SceenInput;
    #SceenDisplay;
    #TerminalInputs;
    #SceenInputContainer;
    #TerminalScreenonUpdate;
    #ScreenID;
    constructor(ScreenId, TerminalScreenonUpdate) {
        // console.log("Screen created");
        this.#ScreenID = ScreenId;
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
        this.#SceenInput.setAttribute("autocomplete", "off");
        this.#InputPrefix = document.createElement("span");
        this.#InputPrefix.textContent = CMD_PREFIX;
        this.#InputPrefix.id = "InputPrefix";
        this.#SceenInputContainer = document.createElement("div");
        this.#SceenInputContainer.id = "SceenInputContainer";
        this.#SceenInputContainer.append(this.#InputPrefix);
        this.#SceenInputContainer.append(this.#SceenInput);

        this.#SceenInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const commandInput = event.target.value;
                const li = document.createElement("li");
                const InputEvent = new TerminalEvents(
                    "Input",
                    {
                        value: commandInput,
                        id: this.#ScreenID,
                    },
                    "User Input"
                );

                const updateEvent = this.#TerminalInputs.onEvent(InputEvent);
                if (updateEvent !== undefined) {
                    if (updateEvent.code === "Add") {
                        console.log(updateEvent);
                        li.append(updateEvent.object.value);
                    }
                } else {
                    li.textContent = commandInput;
                }
                this.#SceenDisplay.append(li);
                event.target.value = "";
            }
        });
        this.#SceenInput.addEventListener("input", (event) => {});
        this.#TerminalInputs = new TerminalInputs(this.onUpdate);
    }
    appendToParent(docElement) {
        if (docElement instanceof HTMLElement) {
            docElement.append(this.#SceenContainer);
        }
    }
    render() {
        this.#SceenContainer.append(this.#SceenDisplay);
        this.#SceenContainer.append(this.#SceenInputContainer);
    }
    onUpdate(event) {}
}
