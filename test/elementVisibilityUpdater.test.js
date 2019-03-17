import { ElementVisibilityUpdater } from "../src/ElementVisibilityUpdater.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";

let elementVisibilityUpdater = new ElementVisibilityUpdater();
let elementFinder = new ElementFinder();
let testHtmlGenerator = new TestHtmlGenerator();

it('Welcome notice hidden', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();

    elementVisibilityUpdater.hideWelcomeNotice();

    expect(elementFinder.searchForWelcomeNotice().style.display).toBe('none');
})

it('normal notice not hidden', () => {
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPage();

    elementVisibilityUpdater.hideWelcomeNotice();

    expect(elementFinder.getNotice().style.display).toBe('');
})

it('Avatar Info Hidden', () => {
    document.body.innerHTML = testHtmlGenerator.getUnsignedInUserPage();

    elementVisibilityUpdater.hideEachPostsElements();

    expect(elementFinder.getAvatarInfoElementsFromPost(elementFinder.getAllPosts()[0])[0].style.display).toBe('none');
})

it('Signed in user runs without exception', () => {
    document.body.innerHTML = testHtmlGenerator.getSignedInUserPage();

    elementVisibilityUpdater.hideWelcomeNotice();
})
