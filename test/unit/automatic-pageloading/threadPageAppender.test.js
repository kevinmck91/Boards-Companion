import { ThreadPageAppender } from "../../../src/automatic-pageloading/ThreadPageAppender.js";
import { ElementFinder } from "../../../src/finders/ElementFinder.js";
import { ChromeStorageMocker } from "../test-environment/ChromeStorageMocker.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { UserTagger } from "../../../src/user-tagging/UserTagger.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { GenericElementGenerator } from "../../../src/element-generators/GenericElementGenerator.js";

let threadPageAppender = new ThreadPageAppender();
let elementFinder = new ElementFinder();
let chromeStorageMocker = new ChromeStorageMocker();
let testEnvironmentArranger = new TestEnvironmentArranger();
let userTagger = new UserTagger();
let testThreadPageBuilder = null;
let genericElementGenerator = new GenericElementGenerator();

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
    chromeStorageMocker.MockGetter(true);
});

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
});

it('add next page successfully', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(elementFinder.getAllPosts().length).toBe(2);
})

it('ensure page navigator is inserted', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.outerHTML.match(/Page 2 of 2/g).length).toBe(2);

})

it('update navigator', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.outerHTML.indexOf("Page 2 of 2")).not.toBe(-1);
})

it('next page posts have compression toggling', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());
    let post = elementFinder.getAllPosts()[1];
    post.click();

    post = elementFinder.getAllPosts()[1];
    expect(elementFinder.getAvatarInfoElementsFromPost(post)[0].style.display).toBe('');
})

it('next page contains custom boards script', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.innerHTML.indexOf("Boards.load('thread')")).not.toBe(-1);
})

it('test tagging applied to next page posts', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    userTagger.applyTagging();
    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(elementFinder.getAllTagIconElements().length).toBe(2);
})

it('test tagging applied ok to signed out page', () => {
    document.body.innerHTML = testThreadPageBuilder.isSignedOut().specificPage(1, 2).buildPage();
    console.error = jest.fn();

    userTagger.applyTagging();
    appendNextPage(testThreadPageBuilder.isSignedOut().withMultiplePosts(2).specificPage(2, 2).buildPage());

    expect(elementFinder.getAllTagIconElements().length).toBe(2);
})

function appendNextPage(pageHtml) {
    let htmlDocument = genericElementGenerator.generateDocument(pageHtml);
    threadPageAppender.appendNextPage(htmlDocument, true);
}

