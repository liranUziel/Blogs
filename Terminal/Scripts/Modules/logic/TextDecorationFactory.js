// Static Class
class TextDecorationFactory {
    constructor() {}

    static creaeteDecoration(type, color, text) {
        const TextSapn = document.createElement("span");
        TextSapn.innerHTML = text;
        return TextSapn;
    }
}
