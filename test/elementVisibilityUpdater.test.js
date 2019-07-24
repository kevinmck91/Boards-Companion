import { ElementVisibilityUpdater } from "../src/ElementVisibilityUpdater.js";
import { ElementFinder } from "../src/finders/ElementFinder.js";
import { TestThreadPageBuilder } from "./test-environment/page-builders/TestThreadPageBuilder.js";

let elementVisibilityUpdater = new ElementVisibilityUpdater();
let elementFinder = new ElementFinder();
let testThreadPageBuilder = null;

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
});

it('Welcome notice hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.hasWelcomeNotice().isSignedOut().buildPage();

    elementVisibilityUpdater.hideWelcomeNotice();

    expect(elementFinder.searchForWelcomeNotice().style.display).toBe('none');
})

it('normal notice not hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.hasNormalNotice().buildPage();

    elementVisibilityUpdater.hideWelcomeNotice();

    expect(elementFinder.getNotice().style.display).toBe('');
})

it('page without notice runs without error', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    elementVisibilityUpdater.hideWelcomeNotice();
})

it('Avatar Info Hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    elementVisibilityUpdater.hideEachPostsElements();

    expect(elementFinder.getAvatarInfoElementsFromPost(elementFinder.getAllPosts()[0])[0].style.display).toBe('none');
})

it('Signed in user runs without exception', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    elementVisibilityUpdater.hideWelcomeNotice();
})
