import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ThreadPagePrepender } from "../src/ThreadPagePrepender.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { UserTagger } from "../src/UserTagger.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";

let testHtmlGenerator = new TestHtmlGenerator();
let threadPagePrepender = new ThreadPagePrepender();
let elementFinder = new ElementFinder();
let testEnvironmentArranger = new TestEnvironmentArranger();
let userTagger = new UserTagger();
let testThreadPageBuilder = null;

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
})

it('add previous page successfully', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    prependPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(elementFinder.getAllPosts().length).toBe(2);
})

it('test tagging applied to previous page posts', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    userTagger.applyTagging();
    prependPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(elementFinder.getAllTagElements().length).toBe(2);
})

function prependPage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    threadPagePrepender.prependPage(htmlDocument, true);
}