/**
 * @author Linra Uziel
 * @name DictionaryTree
 * @version 1.0.0
 * @description DictionaryTree object well hold all words in a dictionary and let you find if word is part of the dictionary.
 *              useful for any syntax keyword search.
 */
// Tree Node
class Node {
    #value;
    childern;
    constructor(value) {
        this.#value = value;
        this.childern = [];
    }
    indexOfChild(letter) {
        for (let i = 0; i < this.childern.length; i++) {
            if (this.childern[i].#value === letter) {
                return i;
            }
        }
        return -1;
    }
    addChild(node) {
        this.childern.push(node);
    }
}

// Tree
export class Dictionaryree {
    #root;
    constructor() {
        this.#root = new Node();
    }
    addWord(word) {
        if (!this.findWord(word)) {
            const letter_index = this.#root.indexOfChild(word[0]);
            if (letter_index === -1) {
                this.#addFullWord(this.#root, word, 0);
            } else {
                const lastNode = this.#findLast(this.#root, word, 0);
                const lastIndex = this.#findLastIndex(this.#root, word, 0);
                this.#addFullWord(lastNode, word, lastIndex);
            }
        }
    }
    #addFullWord(currnetNode, word, index) {
        const node = new Node(word[index]);
        if (index !== word.length - 1) {
            this.#addFullWord(node, word, index + 1);
        }
        currnetNode.addChild(node);
    }
    #findLast(node, word, index) {
        const letter_index = node.indexOfChild(word[index]);
        if (letter_index === -1) {
            return node;
        } else {
            return this.#findLast(node.childern[letter_index], word, index + 1);
        }
    }
    #findLastIndex(node, word, index) {
        const letter_index = node.indexOfChild(word[index]);
        if (letter_index === -1) {
            return index;
        } else {
            return this.#findLastIndex(
                node.childern[letter_index],
                word,
                index + 1
            );
        }
    }
    findWord(word) {
        const index = this.#findLastIndex(this.#root, word, 0);
        if (word.length === index) {
            return true;
        }
        return false;
    }
}
