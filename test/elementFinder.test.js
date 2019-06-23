import { ElementFinder } from "../src/ElementFinder.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { UserTagger } from "../src/UserTagger.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { TestForumPageBuilder } from "./TestForumPageBuilder.js";
import { ElementGenerator } from "../src/ElementGenerator.js";

let elementFinder = new ElementFinder();
let userTagger = new UserTagger();
let testEnvironmentArranger = new TestEnvironmentArranger();
let testThreadPageBuilder = null;
let testForumPageBuilder = new TestForumPageBuilder();
let elementGenerator = new ElementGenerator();

beforeEach(() => {
    testEnvironmentArranger.InitializeEnvironment();
    testThreadPageBuilder = new TestThreadPageBuilder();
    testForumPageBuilder = new TestForumPageBuilder();
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
    document.body.innerHTML = testForumPageBuilder.buildPage();

    let threadsContainer = elementFinder.getThreadsContainerFromDocument(document);

    expect(threadsContainer).not.toBe(null);
})

it('test get threads containers container from document', () => {
    document.body.innerHTML = testForumPageBuilder.buildPage();

    let threadsContainersContainer = elementFinder.getThreadsContainersContainer();

    expect(threadsContainersContainer.outerHTML.indexOf('threadbits')).not.toBe(-1);
})

it('test get user details element', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(1).buildPage();

    let userDetailsElement = elementFinder.getUserDetailsElementFromPost(elementFinder.getAllPosts()[0]);

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

it('test get modal element', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    document.body.appendChild(elementGenerator.generateModalElement());

    let modalElement = elementFinder.getTaggerModalElement();
    expect(modalElement).not.toBe(null);
})