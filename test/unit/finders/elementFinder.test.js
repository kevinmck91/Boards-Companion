import { ElementFinder } from "../../../src/finders/ElementFinder.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { UserTagger } from "../../../src/user-tagging/UserTagger.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { TestForumPageBuilder } from "../test-environment/html-builders/TestForumPageBuilder.js";
import { TestPostBuilder } from "../test-environment/html-builders/TestPostBuilder.js";

let elementFinder = new ElementFinder();
let userTagger = new UserTagger();
let testEnvironmentArranger = new TestEnvironmentArranger();
let testThreadPageBuilder = null;
let testForumPageBuilder = new TestForumPageBuilder();
let testPostBuilder = new TestPostBuilder();

beforeEach(() => {
    testEnvironmentArranger.InitializeEnvironment();
    testThreadPageBuilder = new TestThreadPageBuilder();
    testForumPageBuilder = new TestForumPageBuilder();
    testPostBuilder = new TestPostBuilder();
});

it('test get posts from document', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    let posts = elementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get posts from unsigned in user page', () => {
    let post = testPostBuilder.isSignedOut().build();
    document.body.innerHTML = testThreadPageBuilder.specifyPostContent(post).buildPage();

    let posts = elementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get avatar info elements', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    let avatarInfoElements = elementFinder.getAvatarInfoElementsFromPost(elementFinder.getFirstPost());

    expect(avatarInfoElements[0].outerHTML.includes("Registered User")).toBe(true);
})

it('test get posts from new signed in user page', () => {
    document.body.innerHTML = testThreadPageBuilder.isNewUser().buildPage();

    let posts = elementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get posts container from new signed in user page', () => {
    document.body.innerHTML = testThreadPageBuilder.isNewUser().buildPage();

    let posts = elementFinder.getPostsContainerFromDocument(document);

    expect(posts).not.toBe(null);
})

it('test get threads from document', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    let threadsContainer = elementFinder.getThreadsContainerFromDocument(document);

    expect(threadsContainer).not.toBe(null);
})

it('test get user details element', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(1).buildPage();

    let userDetailsElement = elementFinder.getUserDetailsElementFromPost(elementFinder.getFirstPost());

    expect(userDetailsElement.className).toBe('alt2');
})

it('test get all tag icon elements', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(2).buildPage();

    userTagger.applyTagging();
    let tagIconElements = elementFinder.getAllTagIconElements();

    expect(tagIconElements.length).toBe(2);
})

it('test get username element using tag icon element', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    userTagger.applyTagging();
    let tagIconElement = elementFinder.getAllTagIconElements()[0];
    let userDetailsElement = elementFinder.getUserDetailsElementFromTagElement(tagIconElement);
    let usernameElement = elementFinder.getUsernameElementFromUserDetailsElement(userDetailsElement);

    expect(usernameElement.textContent.indexOf('testusername')).not.toBe(-1);
})

it('test get user posts', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(3).buildPage();

    let userPosts = elementFinder.getUserPosts('testusername');

    expect(userPosts.length).toBe(3);
})

it('test get bottom page navigation ribbon', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    const bottomNavigationRibbon = elementFinder.getThreadBottomNavigationRibbonFromDocument(document);

    expect(bottomNavigationRibbon.outerHTML.match(/<table/g).length).toBe(3);
})

it('test bottom page navigation ribbon cleaned', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    const bottomNavigationRibbon = elementFinder.getThreadBottomNavigationRibbonFromDocument(document);

    expect(bottomNavigationRibbon.outerHTML.match(/<script/g)).toBe(null);

})