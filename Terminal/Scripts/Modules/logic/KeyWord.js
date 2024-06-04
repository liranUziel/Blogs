import { Dictionaryree } from "../../../../DictenaryTree.js";

class KeyWordsHandler {
    keyWords;
    KeyWordTree;
    constructor(filePath) {
        this.KeyWordTree = new Dictionaryree();
        fetch(filePath).then((response) => {
            response.json().then((data) => {
                this.keyWords = data.keyword;
                this.keyWords.forEach((word) => {
                    this.KeyWordTree.addWord(word);
                });
            });
        });
    }
    isKeyWord(word) {
        return this.KeyWordTree.findWord(word);
    }
}

export const keyword = new KeyWordsHandler(
    "./Scripts/Modules/logic/KeyWords.json"
);
