
import { ForumHomepageAppender } from "../../../src/automatic-pageloading/ForumHomepageAppender.js";
import { TestForumPageBuilder } from "../test-environment/html-builders/TestForumPageBuilder.js";
import { ElementFinder } from "../../../src/finders/ElementFinder.js";
import { GenericElementGenerator } from "../../../src/element-generators/GenericElementGenerator.js";


let forumHomepageAppender = new ForumHomepageAppender();
let testForumPageBuilder = null;
let elementFinder = new ElementFinder();
let genericElementGenerator = new GenericElementGenerator();

beforeEach(() => {
    testForumPageBuilder = new TestForumPageBuilder();
})

it('append forum page threads', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    appendForumHomepage(testForumPageBuilder.specificPage(2, 2).buildPage());

    expect(elementFinder.getAllThreadsContainers().length).toBe(2);
})

it('forum page - ensure next page navigator updated', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    appendForumHomepage(testForumPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.outerHTML.indexOf('2 of 2')).not.toBe(-1);
})

function appendForumHomepage(pageHtml) {
    let htmlDocument = genericElementGenerator.generateDocument(pageHtml);
    forumHomepageAppender.appendNextPage(htmlDocument);
}