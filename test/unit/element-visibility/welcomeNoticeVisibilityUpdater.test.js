import { NoticeElementFinder } from "../../../src/finders/NoticeElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { WelcomeNoticeVisibilityUpdater } from "../../../src/element-visibility/WelcomeNoticeVisibilityUpdater.js";
import { TestPostBuilder } from "../test-environment/html-builders/TestPostBuilder.js";

let noticeElementFinder = new NoticeElementFinder();
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

    expect(noticeElementFinder.searchForWelcomeNotice().style.display).toBe('none');
})

it('normal notice not hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.hasNormalNotice().buildPage();

    welcomeNoticeVisibilityUpdater.hideWelcomeNotice();

    expect(noticeElementFinder.getNotice().style.display).toBe('');
})

it('page without notice runs without error', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    welcomeNoticeVisibilityUpdater.hideWelcomeNotice();
})

it('Signed in user runs without exception', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    welcomeNoticeVisibilityUpdater.hideWelcomeNotice();
})