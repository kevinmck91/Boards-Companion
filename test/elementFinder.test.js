import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { UserTagger } from "../src/UserTagger.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";

let testHtmlGenerator = new TestHtmlGenerator();
let elementFinder = new ElementFinder();
let userTagger = new UserTagger();
let testEnvironmentArranger = new TestEnvironmentArranger();
let testThreadPageBuilder = null;

beforeEach(() => {
    testEnvironmentArranger.InitializeEnvironment();
    testThreadPageBuilder = new TestThreadPageBuilder();
});

it('test get posts from document', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    let posts = elementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get posts from unsigned in user page', () => {
    document.body.innerHTML = testThreadPageBuilder.isSignedOut().buildPage();

    let posts = elementFinder.getPostsFromDocument(document);

    expect(posts.length).toBe(1);
})

it('test get avatar info elements', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    let avatarInfoElements = elementFinder.getAvatarInfoElementsFromPost(elementFinder.getAllPosts()[0]);

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
    document.body.innerHTML = testHtmlGenerator.getForumHomePage(1, 2);

    let threadsContainer = elementFinder.getThreadsContainerFromDocument(document);

    expect(threadsContainer).not.toBe(null);
})

it('test get threads containers container from document', () => {
    document.body.innerHTML = testHtmlGenerator.getForumHomePage(1, 2);

    let threadsContainersContainer = elementFinder.getThreadsContainersContainer();

    expect(threadsContainersContainer.outerHTML.indexOf('threadbits')).not.toBe(-1);
})

it('test get user details element', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(1).buildPage();

    let userDetailsElement = elementFinder.getUserDetailsElementFromPost(elementFinder.getAllPosts()[0]);

    expect(userDetailsElement.className).toBe('alt2');
})

it('test get all tag elements', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(2).buildPage();

    userTagger.applyTagging();
    let tagElements = elementFinder.getAllTagElements();

    expect(tagElements.length).toBe(2);
})

it('test get username element using tag element', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    userTagger.applyTagging();
    let tagElement = elementFinder.getAllTagElements()[0];
    let userDetailsElement = elementFinder.getUserDetailsElementFromTagElement(tagElement);
    let usernameElement = elementFinder.getUsernameElementFromUserDetailsElement(userDetailsElement);

    expect(usernameElement.textContent.indexOf('testusername')).not.toBe(-1);
})

it('test get user posts', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(3).buildPage();

    let userPosts = elementFinder.getUserPosts('testusername');

    expect(userPosts.length).toBe(3);
})