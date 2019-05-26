import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ThreadPagePrepender } from "../src/ThreadPagePrepender.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { BoardsScriptInserter } from "../src/BoardsScriptInserter.js";

let testHtmlGenerator = new TestHtmlGenerator();
let threadPagePrepender = new ThreadPagePrepender();
let elementFinder = new ElementFinder();
let boardsScriptInserter = new BoardsScriptInserter();

beforeEach(() => {
    boardsScriptInserter.insertScript(testHtmlGenerator.getExistingJavascriptScriptElement());
    window.scrollTo = () => { };
});

it('add previous page successfully', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    prependPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));

    expect(elementFinder.getAllPosts().length).toBe(2);
})

function prependPage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    threadPagePrepender.prependPage(htmlDocument);
}