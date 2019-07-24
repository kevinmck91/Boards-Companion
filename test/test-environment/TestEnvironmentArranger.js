export { TestEnvironmentArranger }
import { BoardsScriptInserter } from "../../src/inserted-scripts/BoardsScriptInserter.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";

let boardsScriptInserter = new BoardsScriptInserter();
let testHtmlGenerator = new TestHtmlGenerator();
let chromeStorageMocker = new ChromeStorageMocker();

class TestEnvironmentArranger {

    InitializeEnvironment() {
        boardsScriptInserter.insertScript(testHtmlGenerator.getExistingJavascriptScriptElement());
        window.scrollTo = () => { };
        chromeStorageMocker.MockAllValues();
    }
}