//  Handles user input and command
import { TerminalEvents } from "./TerminalEvents.js";
import { keyword } from "../logic/KeyWord.js";
import { TextDecorationFactory } from "../logic/TextDecorationFactory.js";

export class TerminalInputs {
    // Handles user input and command
    #ScreenUpdate;
    constructor(onUpdate) {
        // console.log("TerminalInputs created");
        this.#ScreenUpdate = onUpdate;
    }
    onEvent(event) {
        if (event.code === "Input") {
            const data = event.object;
            const command = data.value.split(" ");
            if (keyword.isKeyWord(command[0])) {
                const span = document.createElement("span");
                const Decotratedtext = TextDecorationFactory.creaeteDecoration(
                    "keyword",
                    command[0]
                );
                span.append(Decotratedtext);
                command.shift();
                span.append(document.createTextNode(` "${command.join(" ")}"`));
                const updateEvent = new TerminalEvents(
                    "Add",
                    {
                        value: span,
                    },
                    "User Input display"
                );
                return updateEvent;
            }
        }
    }
}
