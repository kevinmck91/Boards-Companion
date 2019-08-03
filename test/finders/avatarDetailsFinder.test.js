import { AvatarDetailsFinder } from "../../src/finders/AvatarDetailsFinder.js";
import { ElementFinder } from "../../src/finders/ElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { PostElementsVisibilityUpdater } from "../../src/element-visibility/PostElementsVisibilityUpdater.js";
import { TestPostBuilder } from "../test-environment/html-builders/TestPostBuilder.js";

let testThreadPageBuilder = null;
let elementFinder = new ElementFinder();
let avatarDetailsFinder = new AvatarDetailsFinder();
let postElementsVisibilityUpdater = new PostElementsVisibilityUpdater();
let testPostBuilder = new TestPostBuilder();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    testPostBuilder = new TestPostBuilder();
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    postElementsVisibilityUpdater.hideEachPostsElements();
});

it('test get links section elements', () => {
    let linksSection = avatarDetailsFinder.getLinksSectionElements(elementFinder.getFirstPost());

    expect(linksSection.length).toBe(2);
})

it('test get links section with no avatar', () => {
    let post = testPostBuilder.withoutAvatarPicture().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();
    let linksSectionElements = avatarDetailsFinder.getLinksSectionElements(elementFinder.getFirstPost());

    expect(linksSectionElements[0].outerHTML.indexOf("Adverts")).not.toBe(-1);
})

it('test get avatar picture', () => {
    let avatarPicture = avatarDetailsFinder.getAvatarPictureElement(elementFinder.getFirstPost());

    expect(avatarPicture.outerHTML.indexOf("avatarpic")).not.toBe(-1);
})


it('test get join date ', () => {
    let joinDateElement = avatarDetailsFinder.getJoinDateElement(elementFinder.getFirstPost());

    expect(joinDateElement.outerHTML.indexOf("Mar 2019")).not.toBe(-1);
})

it('test get registered user element ', () => {
    let registeredUserElement = avatarDetailsFinder.getRegisteredUserElement(elementFinder.getFirstPost());

    expect(registeredUserElement.outerHTML.indexOf("Registered User")).not.toBe(-1);
})

it('test get custom registered user element', () => {
    let post = testPostBuilder.withCustomRegisteredUserElement("customregistereduser").build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    let registeredUserElement = avatarDetailsFinder.getRegisteredUserElement(elementFinder.getFirstPost());

    expect(registeredUserElement.outerHTML.indexOf("customregistereduser")).not.toBe(-1);
})

it('test get stars element ', () => {
    let registeredUserElement = avatarDetailsFinder.getStarsElement(elementFinder.getFirstPost());

    expect(registeredUserElement.outerHTML.indexOf("stars")).not.toBe(-1);
})

it('test get linebreak element ', () => {
    let lineBreakElement = avatarDetailsFinder.getLineBreakElements(elementFinder.getFirstPost());

    expect(lineBreakElement.length).toBe(2);
})

it('test get post count element when no links section', () => {
    let post = testPostBuilder.withoutLinksSection().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    let postCountElement = avatarDetailsFinder.getPostCountElement(elementFinder.getFirstPost());

    expect(postCountElement.outerHTML.indexOf("Posts:")).not.toBe(-1);
})

