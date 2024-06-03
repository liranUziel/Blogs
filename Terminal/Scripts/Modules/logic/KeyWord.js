import { Dictionaryree } from "../../../../DictenaryTree.js";

export default class KeyWordsHandler {
    keyWords;
    KeyWordTree = new Dictionaryree();
    constructor() {
        fetch("Scripts/Modules/logic/keywords.json").then((response) => {
            response.json().then((data) => {
                this.keywords = data.keyword;
                this.forEach((word) => {
                    KeyWordTree.addWord(word);
                });
            });
        });
    }
    isKeyWord() {
        return this.KeyWordTree.findWord(word);
    }
}
