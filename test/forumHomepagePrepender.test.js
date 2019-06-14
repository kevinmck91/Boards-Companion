import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ForumHomepagePrepender } from "../src/ForumHomepagePrepender.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { TestForumPageBuilder } from "./TestForumPageBuilder.js";

let testHtmlGenerator = new TestHtmlGenerator();
let forumHomepagePrepender = new ForumHomepagePrepender();
let testEnvironmentArranger = new TestEnvironmentArranger();
let testForumPageBuilder = null;

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

beforeEach(() => {
    testForumPageBuilder = new TestForumPageBuilder();
})

it('ensure forum homepage elements are prepended in correct order', () => {
    document.body.innerHTML = testForumPageBuilder.specificPage(2, 2).buildPage();

    prependForumHomepage(testForumPageBuilder.buildPage());

    let pageNoElement = document.body.querySelectorAll("form > *")[1];
    expect(pageNoElement.outerHTML.indexOf('<div')).not.toBe(-1);
})

function prependForumHomepage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    forumHomepagePrepender.prependPage(htmlDocument);
}