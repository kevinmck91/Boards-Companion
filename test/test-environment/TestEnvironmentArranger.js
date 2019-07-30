export { TestEnvironmentArranger }
import { BoardsScriptInserter } from "../../src/inserted-scripts/BoardsScriptInserter.js";
import { TestCommonHtmlGenerator } from "./TestCommonHtmlGenerator.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";

let boardsScriptInserter = new BoardsScriptInserter();
let testCommonHtmlGenerator = new TestCommonHtmlGenerator();
let chromeStorageMocker = new ChromeStorageMocker();

class TestEnvironmentArranger {

    InitializeEnvironment() {
        boardsScriptInserter.insertScript(testCommonHtmlGenerator.getExistingJavascriptScriptElement());
        window.scrollTo = () => { };
        chromeStorageMocker.MockAllValues();
    }
}