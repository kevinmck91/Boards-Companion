import { AvatarElementFinder } from "../../../src/finders/AvatarElementFinder.js";
import { PostElementFinder } from "../../../src/finders/PostElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { PostElementsVisibilityUpdater } from "../../../src/element-visibility/PostElementsVisibilityUpdater.js";
import { TestPostBuilder } from "../test-environment/html-builders/TestPostBuilder.js";
import { UserTagger } from "../../../src/user-tagging/UserTagger.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";

let testThreadPageBuilder = null;
let postElementFinder = new PostElementFinder();
let avatarElementFinder = new AvatarElementFinder();
let postElementsVisibilityUpdater = new PostElementsVisibilityUpdater();
let testPostBuilder = new TestPostBuilder();
let userTagger = new UserTagger();
let testEnvironmentArranger = new TestEnvironmentArranger();

beforeEach(() => {
    testEnvironmentArranger.InitializeEnvironment();
    testThreadPageBuilder = new TestThreadPageBuilder();
    testPostBuilder = new TestPostBuilder();
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    postElementsVisibilityUpdater.hideEachPostsElements();
});

it('test get links section elements', () => {
    let linksSection = avatarElementFinder.getLinksSectionElements(postElementFinder.getFirstPost());

    expect(linksSection.length).toBe(2);
})

it('test get links section with no avatar', () => {
    let post = testPostBuilder.withoutAvatarPicture().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    postElementsVisibilityUpdater.hideEachPostsElements();
    let linksSectionElements = avatarElementFinder.getLinksSectionElements(postElementFinder.getFirstPost());

    expect(linksSectionElements[0].outerHTML.indexOf("Adverts")).not.toBe(-1);
})

it('test get avatar picture', () => {
    let avatarPicture = avatarElementFinder.getAvatarPictureElement(postElementFinder.getFirstPost());

    expect(avatarPicture.outerHTML.indexOf("avatarpic")).not.toBe(-1);
})

it('test get join date ', () => {
    let joinDateElement = avatarElementFinder.getJoinDateElement(postElementFinder.getFirstPost());

    expect(joinDateElement.outerHTML.indexOf("Mar 2019")).not.toBe(-1);
})

it('test get registered user element ', () => {
    let registeredUserElement = avatarElementFinder.getRegisteredUserElement(postElementFinder.getFirstPost());

    expect(registeredUserElement.outerHTML.indexOf("Registered User")).not.toBe(-1);
})

it('test get custom registered user element', () => {
    let post = testPostBuilder.withCustomRegisteredUserElement("customregistereduser").build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    let registeredUserElement = avatarElementFinder.getRegisteredUserElement(postElementFinder.getFirstPost());

    expect(registeredUserElement.outerHTML.indexOf("customregistereduser")).not.toBe(-1);
})

it('test get stars element ', () => {
    let starsElement = avatarElementFinder.getStarsElement(postElementFinder.getFirstPost());

    expect(starsElement.outerHTML.indexOf("stars")).not.toBe(-1);
})

it('test get stars element if no registered user element', () => {
    let post = testPostBuilder.withoutRegisteredUserElement().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    let starsElement = avatarElementFinder.getStarsElement(postElementFinder.getFirstPost());

    expect(starsElement.outerHTML.indexOf("stars")).not.toBe(-1);
})

it('test get linebreak element ', () => {
    let lineBreakElement = avatarElementFinder.getLineBreakElements(postElementFinder.getFirstPost());

    expect(lineBreakElement.length).toBe(2);
})

it('test get post count element when no links section', () => {
    let post = testPostBuilder.withoutLinksSection().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    let postCountElement = avatarElementFinder.getPostCountElement(postElementFinder.getFirstPost());

    expect(postCountElement.outerHTML.indexOf("Posts:")).not.toBe(-1);
})

it('test get avatar info elements', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    let avatarInfoElements = avatarElementFinder.getAvatarInfoElementsFromPost(postElementFinder.getFirstPost());

    expect(avatarInfoElements[0].outerHTML.includes("Registered User")).toBe(true);
})

it('test get user details element', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(1).buildPage();

    let userDetailsElement = avatarElementFinder.getUserDetailsElementFromPost(postElementFinder.getFirstPost());

    expect(userDetailsElement.className).toBe('alt2');
})

it('test get all tag icon elements', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(2).buildPage();

    userTagger.applyTagging();
    let tagIconElements = avatarElementFinder.getAllTagIconElements();

    expect(tagIconElements.length).toBe(2);
})

it('test get username element using tag icon element', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    userTagger.applyTagging();
    let tagIconElement = avatarElementFinder.getAllTagIconElements()[0];
    let userDetailsElement = avatarElementFinder.getUserDetailsElementFromTagElement(tagIconElement);
    let usernameElement = avatarElementFinder.getUsernameElementFromUserDetailsElement(userDetailsElement);

    expect(usernameElement.textContent.indexOf('testusername')).not.toBe(-1);
})