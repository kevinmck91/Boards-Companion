import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ForumHomepageAppender } from "../src/ForumHomepageAppender.js";
import { ElementFinder } from "../src/ElementFinder.js";

let testHtmlGenerator = new TestHtmlGenerator();
let forumHomepageAppender = new ForumHomepageAppender();
let elementFinder = new ElementFinder();

it('append forum page threads', () => {
    document.body.innerHTML = testHtmlGenerator.getForumHomePage(1, 2);

    appendForumHomepage(testHtmlGenerator.getForumHomePage(2, 2));

    expect(elementFinder.getAllThreadsContainers().length).toBe(2);
})

it('forum page - ensure next page navigator updated', () => {
    document.body.innerHTML = testHtmlGenerator.getForumHomePage(1, 2);

    appendForumHomepage(testHtmlGenerator.getForumHomePage(2, 2));

    expect(document.body.outerHTML.indexOf('2 of 2')).not.toBe(-1);
})

function appendForumHomepage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    forumHomepageAppender.appendNextPage(htmlDocument);
}