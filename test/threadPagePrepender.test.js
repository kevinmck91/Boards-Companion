import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ThreadPagePrepender } from "../src/ThreadPagePrepender.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { UserTagger } from "../src/UserTagger.js";

let testHtmlGenerator = new TestHtmlGenerator();
let threadPagePrepender = new ThreadPagePrepender();
let elementFinder = new ElementFinder();
let testEnvironmentArranger = new TestEnvironmentArranger();
let userTagger = new UserTagger();

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

it('add previous page successfully', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    prependPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));

    expect(elementFinder.getAllPosts().length).toBe(2);
})


it('test tagging applied to previous page posts', () => {
    document.body.innerHTML = testHtmlGenerator.getSpecificSignedInUserPage(1, 2);

    userTagger.applyTagging();
    prependPage(testHtmlGenerator.getSpecificSignedInUserPage(2, 2));

    expect(elementFinder.getAllTagElements().length).toBe(2);
})

function prependPage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    threadPagePrepender.prependPage(htmlDocument);
}