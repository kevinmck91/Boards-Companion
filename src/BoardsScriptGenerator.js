export { BoardsScriptGenerator }
import { ElementGenerator } from "./ElementGenerator.js";

class BoardsScriptGenerator {

    constructor() {
        this.elementGenerator = new ElementGenerator();
    }

    GeneratePostPostsInsertScript() {
        return this.elementGenerator.GenerateScriptElement(this._enableMultiQuotes() + this._enableQuickReply());
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