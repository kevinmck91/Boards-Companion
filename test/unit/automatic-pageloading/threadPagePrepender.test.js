import { ThreadPagePrepender } from "../../../src/automatic-pageloading/ThreadPagePrepender.js";
import { PostElementFinder } from "../../../src/finders/PostElementFinder.js";
import { AvatarElementFinder } from "../../../src/finders/AvatarElementFinder.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { UserTagger } from "../../../src/user-tagging/UserTagger.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { GenericElementGenerator } from "../../../src/element-generators/GenericElementGenerator.js";

let threadPagePrepender = new ThreadPagePrepender();
let postElementFinder = new PostElementFinder();
let avatarElementFinder = new AvatarElementFinder();
let testEnvironmentArranger = new TestEnvironmentArranger();
let userTagger = new UserTagger();
let testThreadPageBuilder = null;
let genericElementGenerator = new GenericElementGenerator();

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
})

it('add previous page successfully', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    prependPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(postElementFinder.getAllPosts().length).toBe(2);
})

it('test tagging applied to previous page posts', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    userTagger.applyTagging();
    prependPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(avatarElementFinder.getAllTagIconElements().length).toBe(2);
})

function prependPage(pageHtml) {
    let htmlDocument = genericElementGenerator.generateDocument(pageHtml);
    threadPagePrepender.prependPage(htmlDocument, true);
}