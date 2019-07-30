import { ElementFinder } from "../../src/finders/ElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/page-builders/TestThreadPageBuilder.js";
import { WelcomeNoticeVisibilityUpdater } from "../../src/element-visibility/WelcomeNoticeVisibilityUpdater.js";
import { TestPostBuilder } from "../test-environment/TestPostBuilder.js";

let elementFinder = new ElementFinder();
let testThreadPageBuilder = null;
let welcomeNoticeVisibilityUpdater = new WelcomeNoticeVisibilityUpdater();
let testPostBuilder = new TestPostBuilder();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    testPostBuilder = new TestPostBuilder();
});

it('Welcome notice hidden', () => {
    let post = testPostBuilder.isSignedOut().build();
    document.body.innerHTML = testThreadPageBuilder.hasWelcomeNotice().specifyPostContent(post).buildPage();

    welcomeNoticeVisibilityUpdater.hideWelcomeNotice();

    expect(elementFinder.searchForWelcomeNotice().style.display).toBe('none');
})

it('normal notice not hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.hasNormalNotice().buildPage();

    welcomeNoticeVisibilityUpdater.hideWelcomeNotice();

    expect(elementFinder.getNotice().style.display).toBe('');
})

it('page without notice runs without error', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    welcomeNoticeVisibilityUpdater.hideWelcomeNotice();
})

it('Signed in user runs without exception', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    welcomeNoticeVisibilityUpdater.hideWelcomeNotice();
})