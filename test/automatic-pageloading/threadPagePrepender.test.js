import { ThreadPagePrepender } from "../../src/automatic-pageloading/ThreadPagePrepender.js";
import { ElementFinder } from "../../src/finders/ElementFinder.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { UserTagger } from "../../src/user-tagging/UserTagger.js";
import { TestThreadPageBuilder } from "../test-environment/page-builders/TestThreadPageBuilder.js";
import { ElementGenerator } from "../../src/ElementGenerator.js";

let threadPagePrepender = new ThreadPagePrepender();
let elementFinder = new ElementFinder();
let testEnvironmentArranger = new TestEnvironmentArranger();
let userTagger = new UserTagger();
let testThreadPageBuilder = null;
let elementGenerator = new ElementGenerator();

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

    expect(elementFinder.getAllTagIconElements().length).toBe(2);
})

function prependPage(pageHtml) {
    let htmlDocument = elementGenerator.convertToDocument(pageHtml);
    threadPagePrepender.prependPage(htmlDocument, true);
}