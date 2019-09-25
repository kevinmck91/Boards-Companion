import { ElementFinder } from "../../../src/finders/ElementFinder.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { TestForumPageBuilder } from "../test-environment/html-builders/TestForumPageBuilder.js";

let elementFinder = new ElementFinder();
let testEnvironmentArranger = new TestEnvironmentArranger();
let testForumPageBuilder = new TestForumPageBuilder();

beforeEach(() => {
    testEnvironmentArranger.InitializeEnvironment();
    testForumPageBuilder = new TestForumPageBuilder();
});

it('test get threads from document', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    let threadsContainer = elementFinder.getThreadsContainerFromDocument(document);

    expect(threadsContainer).not.toBe(null);
})
