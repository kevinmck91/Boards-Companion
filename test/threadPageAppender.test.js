import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ThreadPageAppender } from "../src/ThreadPageAppender.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";
import { BoardsScriptInserter } from "../src/BoardsScriptInserter.js";

let testHtmlGenerator = new TestHtmlGenerator();
let threadPageAppender = new ThreadPageAppender();
let elementFinder = new ElementFinder();
let chromeStorageMocker = new ChromeStorageMocker();
let boardsScriptInserter = new BoardsScriptInserter();

beforeEach(() => {
    boardsScriptInserter.insertScript(testHtmlGenerator.getExistingJavascriptScriptElement());
    chromeStorageMocker.MockReturnValue(true);
});

it('add next page successfully', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    appendNextPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));

    expect(elementFinder.getAllPosts().length).toBe(2);
})


it('insert correct page no', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    appendNextPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));

    expect(document.body.outerHTML.indexOf("page 2")).not.toBe(-1);
})

it('update navigator', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    appendNextPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));

    expect(document.body.outerHTML.indexOf("Page 2 of 2")).not.toBe(-1);
})

it('next page posts have compression toggling', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    appendNextPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));
    let post = elementFinder.getAllPosts()[1];
    post.click();

    post = elementFinder.getAllPosts()[1];
    expect(elementFinder.getAvatarInfoElementsFromPost(post)[0].style.display).toBe('');
})

it('next page contains custom boards script', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    appendNextPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));

    expect(document.body.innerHTML.indexOf("Boards.load('thread')")).not.toBe(-1);
})

function appendNextPage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    threadPageAppender.appendNextPage(htmlDocument, true);
}

