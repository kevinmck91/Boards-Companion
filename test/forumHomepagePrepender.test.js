import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ForumHomepagePrepender } from "../src/ForumHomepagePrepender.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { ElementFinder } from "../src/ElementFinder.js";

let testHtmlGenerator = new TestHtmlGenerator();
let forumHomepagePrepender = new ForumHomepagePrepender();
let testEnvironmentArranger = new TestEnvironmentArranger();
let elementFinder = new ElementFinder();

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

it('ensure forum homepage elements are prepended in correct order', () => {
    document.body.innerHTML = testHtmlGenerator.getForumHomePage(2, 2);

    prependForumHomepage(testHtmlGenerator.getForumHomePage(1, 2));

    let pageNoElement = document.body.querySelectorAll(".left-col > *")[1];
    expect(pageNoElement.outerHTML.indexOf('<div')).not.toBe(-1);
})

it('ensure forum homepage elements are prepended correctly', () => {
    document.body.innerHTML = testHtmlGenerator.getForumHomePage(2, 2);

    prependForumHomepage(testHtmlGenerator.getForumHomePage(1, 2));

    expect(elementFinder.getAllThreadsContainers().length).toBe(2);
})

function prependForumHomepage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    forumHomepagePrepender.prependPage(htmlDocument);
}