import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ForumHomepageAppender } from "../src/ForumHomepageAppender.js";

let testHtmlGenerator = new TestHtmlGenerator();
let forumHomepageAppender = new ForumHomepageAppender();

it('append forum page threads', () => {
    document.body.innerHTML = testHtmlGenerator.getForumHomePage(1, 2);

    appendNextPageOfForumHomepage(testHtmlGenerator.getForumHomePage(2, 2));

    expect(document.body.outerHTML.match(/threadslist/g).length).toBe(2);
})

it('forum page - ensure next page navigator updated', () => {
    document.body.innerHTML = testHtmlGenerator.getForumHomePage(1, 2);

    appendNextPageOfForumHomepage(testHtmlGenerator.getForumHomePage(2, 2));

    expect(document.body.outerHTML.indexOf('2 of 2')).not.toBe(-1);
})

function appendNextPageOfForumHomepage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    forumHomepageAppender.appendNextPage(htmlDocument);
}