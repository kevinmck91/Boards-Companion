
import { ForumHomepageAppender } from "../../../src/automatic-pageloading/ForumHomepageAppender.js";
import { TestForumPageBuilder } from "../test-environment/html-builders/TestForumPageBuilder.js";
import { GenericElementGenerator } from "../../../src/element-generators/GenericElementGenerator.js";


let forumHomepageAppender = new ForumHomepageAppender();
let testForumPageBuilder = null;
let genericElementGenerator = new GenericElementGenerator();

beforeEach(() => {
    testForumPageBuilder = new TestForumPageBuilder();
})

it('append forum page threads', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    appendForumHomepage(testForumPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.outerHTML.match(/title/g).length).toBe(2);
})

it('forum page - ensure next page navigator updated', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    appendForumHomepage(testForumPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.outerHTML.indexOf('2 of 2')).not.toBe(-1);
})

it('ensure navigation ribbon is inserted', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    appendForumHomepage(testForumPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.outerHTML.match(/2 of 2/g).length).toBe(2);
})

it('ensure navigation ribbon inserted between pages', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    appendForumHomepage(testForumPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.outerHTML.match(/title([\s\S]*)2 of 2([\s\S]*)title/)).not.toBe(null);
})

it('ensure signed out page appended correctly', () => {
    document.body.innerHTML = testForumPageBuilder.isSignedOut().buildPage();

    appendForumHomepage(testForumPageBuilder.isSignedOut().specificPage(2, 2).buildPage());

    expect(document.body.outerHTML.match(/threadslist-wrapper/g).length).toBe(2);
})

function appendForumHomepage(pageHtml) {
    let htmlDocument = genericElementGenerator.generateDocument(pageHtml);
    forumHomepageAppender.appendNextPage(htmlDocument);
}