// Static Class

const DecorationObject = {
    keyword: [
        { name: "font-weight", value: "bold" },
        { name: "color", value: "var(--font-color-keyword)" },
        { name: "font-size", value: "var(--font-size)" },
    ],
};
export class TextDecorationFactory {
    constructor() {}

    static creaeteDecoration(type, text) {
        const TextSapn = document.createElement("span");
        TextSapn.innerHTML = text;
        const decorations = DecorationObject[type];
        if (decorations !== undefined) {
            decorations.forEach((decoration) => {
                TextSapn.style[decoration.name] = decoration.value;
            });
        }
        return TextSapn;
    }
}
