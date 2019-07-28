import { AvatarDetailsFinder } from "../../src/finders/AvatarDetailsFinder.js";
import { ElementFinder } from "../../src/finders/ElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/page-builders/TestThreadPageBuilder.js";
import { ElementVisibilityUpdater } from "../../src/ElementVisibilityUpdater.js";

let testThreadPageBuilder = null;
let elementFinder = new ElementFinder();
let avatarDetailsFinder = new AvatarDetailsFinder();
let elementVisibilityUpdater = new ElementVisibilityUpdater();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    elementVisibilityUpdater.hideEachPostsElements();
});

it('test get links section elements', () => {
    let linksSection = avatarDetailsFinder.getLinksSectionElements(elementFinder.getAllPosts()[0]);

    expect(linksSection.length).toBe(2);
})

it('test get links section with no avatar', () => {
    document.body.innerHTML = testThreadPageBuilder.withNoUserAvatarPics().buildPage();

    elementVisibilityUpdater.hideEachPostsElements();
    let linksSectionElements = avatarDetailsFinder.getLinksSectionElements(elementFinder.getAllPosts()[0]);

    expect(linksSectionElements[0].outerHTML.indexOf("Adverts")).not.toBe(-1);
})

it('test get avatar picture', () => {
    let avatarPicture = avatarDetailsFinder.getAvatarPictureElement(elementFinder.getAllPosts()[0]);

    expect(avatarPicture.outerHTML.indexOf("avatarpic")).not.toBe(-1);
})


it('test get join date ', () => {
    let joinDateElement = avatarDetailsFinder.getJoinDateElement(elementFinder.getAllPosts()[0]);

    expect(joinDateElement.outerHTML.indexOf("Mar 2019")).not.toBe(-1);
})

it('test get registered user element ', () => {
    let registeredUserElement = avatarDetailsFinder.getRegisteredUserElement(elementFinder.getAllPosts()[0]);

    expect(registeredUserElement.outerHTML.indexOf("Registered User")).not.toBe(-1);
})

it('test get stars element ', () => {
    let registeredUserElement = avatarDetailsFinder.getStarsElement(elementFinder.getAllPosts()[0]);

    expect(registeredUserElement.outerHTML.indexOf("stars")).not.toBe(-1);
})

it('test get linebreak element ', () => {
    let lineBreakElement = avatarDetailsFinder.getLineBreakElements(elementFinder.getAllPosts()[0]);

    expect(lineBreakElement.length).toBe(2);
})