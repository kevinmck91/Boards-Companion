import { ElementVisibilityUpdater } from "../src/ElementVisibilityUpdater.js";
import { ElementFinder } from "../src/finders/ElementFinder.js";
import { AvatarDetailsFinder } from "../src/finders/AvatarDetailsFinder.js";
import { TestThreadPageBuilder } from "./test-environment/page-builders/TestThreadPageBuilder.js";

let elementVisibilityUpdater = new ElementVisibilityUpdater();
let elementFinder = new ElementFinder();
let testThreadPageBuilder = null;
let avatarDetailsFinder = new AvatarDetailsFinder();

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

it('Registered user element hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    elementVisibilityUpdater.hideEachPostsElements();

    expect(elementFinder.getAvatarInfoElementsFromPost(elementFinder.getAllPosts()[0])[0].style.display).toBe('none');
})

it('Join date element displayed', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    elementVisibilityUpdater.hideEachPostsElements();

    expect(avatarDetailsFinder.getJoinDateElement(elementFinder.getAllPosts()[0]).style.display).toBe('');
})

it('Avatar links elements hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    elementVisibilityUpdater.hideEachPostsElements();
    let linksSectionElements = avatarDetailsFinder.getLinksSectionElements(elementFinder.getAllPosts()[0]);

    expect(linksSectionElements[0].style.display).toBe('none');
})


it('Stars element hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    elementVisibilityUpdater.hideEachPostsElements();

    let starsElement = avatarDetailsFinder.getStarsElement(elementFinder.getAllPosts()[0]);
    expect(starsElement.style.display).toBe('none');
})


it('&nbsp; removed from avatar info', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    elementVisibilityUpdater.hideEachPostsElements();

    expect(elementFinder.getAllPosts()[0].outerHTML.indexOf('&nbsp;')).toBe(-1);
})

it('Signed in user runs without exception', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    elementVisibilityUpdater.hideWelcomeNotice();
})

it('links element not visible when no avatar', () => {
    document.body.innerHTML = testThreadPageBuilder.withNoUserAvatarPics().buildPage();

    elementVisibilityUpdater.hideEachPostsElements();

    let linksSectionElements = avatarDetailsFinder.getLinksSectionElements(elementFinder.getAllPosts()[0]);
    expect(linksSectionElements[1].style.display).toBe("none");
})

it('post count visible when no avatar', () => {
    document.body.innerHTML = testThreadPageBuilder.withNoUserAvatarPics().buildPage();

    elementVisibilityUpdater.hideEachPostsElements();

    let postCountElement = avatarDetailsFinder.getPostCountElement(elementFinder.getAllPosts()[0]);

    expect(postCountElement.style.display).toBe("");
    expect(postCountElement.parentElement.style.display).toBe("");
})

it('avatar hidden', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    elementVisibilityUpdater.hideEachPostsElements();

    let avatarPictureElement = avatarDetailsFinder.getAvatarPictureElement(elementFinder.getAllPosts()[0]);
    expect(avatarPictureElement.style.display).toBe("none");
})