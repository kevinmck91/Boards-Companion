import { ElementFinder } from "../../src/finders/ElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/page-builders/TestThreadPageBuilder.js";
import { WelcomeNoticeVisibilityUpdater } from "../../src/element-visibility/WelcomeNoticeVisibilityUpdater.js";

let elementFinder = new ElementFinder();
let testThreadPageBuilder = null;
let welcomeNoticeVisibilityUpdater = new WelcomeNoticeVisibilityUpdater();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
});

it('Welcome notice hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.hasWelcomeNotice().isSignedOut().buildPage();

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