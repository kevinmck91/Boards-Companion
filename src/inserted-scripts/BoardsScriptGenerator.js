export { BoardsScriptGenerator }
import { GenericElementGenerator } from "../element-generators/GenericElementGenerator.js"

class BoardsScriptGenerator {

    constructor() {
        this.genericElementGenerator = new GenericElementGenerator();
    }

    GeneratePostPostsInsertScript() {
        return this.genericElementGenerator.generateScriptElement(this._enableMultiQuotes() + this._enableQuickReply());
    }

    _enableMultiQuotes() {
        return `
        Boards["Thread"].ready = false;
        Boards.load('thread');`;
    }

    _enableQuickReply() {
        return `
        qr_init();`;
    }
}