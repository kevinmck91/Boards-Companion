export { TestEnvironmentArranger }
import { BoardsScriptInserter } from "../src/BoardsScriptInserter.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";

let boardsScriptInserter = new BoardsScriptInserter();
let testHtmlGenerator = new TestHtmlGenerator();

class TestEnvironmentArranger {

    InitializeEnvironment() {
        boardsScriptInserter.insertScript(testHtmlGenerator.getExistingJavascriptScriptElement());
        window.scrollTo = () => { };
    }
}