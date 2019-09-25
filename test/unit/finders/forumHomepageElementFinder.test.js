import { ForumHomepageElementFinder } from "../../../src/finders/ForumHomepageElementFinder.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { TestForumPageBuilder } from "../test-environment/html-builders/TestForumPageBuilder.js";

let forumHomepageElementFinder = new ForumHomepageElementFinder();
let testEnvironmentArranger = new TestEnvironmentArranger();
let testForumPageBuilder = new TestForumPageBuilder();

beforeEach(() => {
    testEnvironmentArranger.InitializeEnvironment();
    testForumPageBuilder = new TestForumPageBuilder();
});

it('test get threads from document', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    let threadsContainer = forumHomepageElementFinder.getThreadsContainerFromDocument(document);

    expect(threadsContainer).not.toBe(null);
})
